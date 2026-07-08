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

export function installTranslationCrashGuard() {
  if (installed || typeof Node === "undefined") return;
  installed = true;

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
