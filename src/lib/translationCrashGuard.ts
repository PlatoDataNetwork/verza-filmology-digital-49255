// Google Translate rewrites the DOM by wrapping text nodes in <font> elements.
// React keeps its own virtual view of the DOM, so when it later tries to
// remove or move a node that Translate has re-parented, the real node is no
// longer where React expects it — throwing:
//   NotFoundError: Failed to execute 'removeChild' on 'Node'
//   NotFoundError: Failed to execute 'insertBefore' on 'Node'
// These crashes blank the page on navigation after a language switch.
//
// The fix (widely used in the React + Google Translate ecosystem) is to make
// removeChild/insertBefore defensive: if the node isn't actually a child of
// the expected parent, no-op gracefully instead of throwing.

let installed = false;

const DEFAULT_LANG = "en";

function getActiveTranslatedLanguage(): string | null {
  if (typeof document === "undefined") return null;

  const match = document.cookie.match(/(?:^|;\s*)googtrans=\/[^/]+\/([^;]+)/);
  if (!match) return null;

  const lang = decodeURIComponent(match[1]);
  return lang && lang !== DEFAULT_LANG ? lang : null;
}

function isPlainLeftClick(event: MouseEvent): boolean {
  return (
    event.button === 0 &&
    !event.altKey &&
    !event.ctrlKey &&
    !event.metaKey &&
    !event.shiftKey
  );
}

function shouldHardNavigate(anchor: HTMLAnchorElement, event: MouseEvent): boolean {
  if (!getActiveTranslatedLanguage() || !isPlainLeftClick(event)) return false;
  if (anchor.target && anchor.target !== "_self") return false;
  if (anchor.hasAttribute("download")) return false;

  const rawHref = anchor.getAttribute("href");
  if (
    !rawHref ||
    rawHref.startsWith("#") ||
    rawHref.startsWith("mailto:") ||
    rawHref.startsWith("tel:") ||
    rawHref.startsWith("javascript:")
  ) {
    return false;
  }

  const url = new URL(anchor.href, window.location.href);
  if (url.origin !== window.location.origin) return false;

  // Hash-only navigation on the current page does not require React to
  // reconcile route content, so keep native anchor behavior for smooth jumps.
  if (
    url.pathname === window.location.pathname &&
    url.search === window.location.search &&
    url.hash
  ) {
    return false;
  }

  return true;
}

export function installTranslationCrashGuard() {
  if (installed || typeof Node === "undefined") return;
  installed = true;

  // Google Translate mutates React-owned DOM. While a non-English translation
  // is active, keep internal links as full document navigations instead of SPA
  // route transitions so React does not reconcile a translated tree.
  if (typeof document !== "undefined") {
    document.addEventListener(
      "click",
      (event) => {
        const target = event.target;
        if (!(target instanceof Element)) return;

        const anchor = target.closest<HTMLAnchorElement>("a[href]");
        if (!anchor || !shouldHardNavigate(anchor, event)) return;

        event.preventDefault();
        event.stopImmediatePropagation();
        window.location.assign(anchor.href);
      },
      true,
    );

    window.addEventListener(
      "popstate",
      (event) => {
        if (!getActiveTranslatedLanguage()) return;
        event.stopImmediatePropagation();
        window.location.reload();
      },
      true,
    );
  }

  const originalRemoveChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function <T extends Node>(this: Node, child: T): T {
    if (child.parentNode !== this) {
      if (console && console.warn) {
        console.warn(
          "Suppressed removeChild on a node mutated by Google Translate.",
        );
      }
      return child;
    }
    // eslint-disable-next-line prefer-rest-params
    return originalRemoveChild.apply(this, arguments as never) as T;
  };

  const originalInsertBefore = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function <T extends Node>(
    this: Node,
    newNode: T,
    referenceNode: Node | null,
  ): T {
    if (referenceNode && referenceNode.parentNode !== this) {
      if (console && console.warn) {
        console.warn(
          "Suppressed insertBefore on a node mutated by Google Translate.",
        );
      }
      return newNode;
    }
    // eslint-disable-next-line prefer-rest-params
    return originalInsertBefore.apply(this, arguments as never) as T;
  };
}
