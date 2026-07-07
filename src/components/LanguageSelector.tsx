import { useEffect, useState } from "react";
import { Globe } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LANGUAGES, INCLUDED_LANGUAGE_CODES } from "@/lib/languages";

declare global {
  interface Window {
    google?: {
      translate?: {
        TranslateElement?: new (config: unknown, element: string) => void;
      };
    };
    googleTranslateElementInit?: () => void;
  }
}

const DEFAULT_LANG = "en";

/** Read the target language from the Google Translate cookie (`/en/xx`). */
function readCookieLang(): string {
  const match = document.cookie.match(/googtrans=\/[^/]+\/([^;]+)/);
  return match ? decodeURIComponent(match[1]) : DEFAULT_LANG;
}

/** Persist the selection so it survives page navigation/reload. */
function setCookieLang(lang: string) {
  const value = lang === DEFAULT_LANG ? "" : `/en/${lang}`;
  const domain = window.location.hostname;
  const base = value ? `googtrans=${value}` : "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie = `${base};path=/`;
  document.cookie = `${base};path=/;domain=${domain}`;
  document.cookie = `${base};path=/;domain=.${domain}`;
}

let scriptLoaded = false;

function loadTranslateScript() {
  if (scriptLoaded || document.getElementById("google-translate-script")) return;
  scriptLoaded = true;

  window.googleTranslateElementInit = () => {
    if (!window.google?.translate?.TranslateElement) return;
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        includedLanguages: INCLUDED_LANGUAGE_CODES,
        autoDisplay: false,
      },
      "google_translate_element",
    );
  };

  const script = document.createElement("script");
  script.id = "google-translate-script";
  script.src =
    "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  script.async = true;
  document.body.appendChild(script);
}

/** Apply a language via the hidden Google Translate combo box. */
function applyLanguage(lang: string): boolean {
  const combo = document.querySelector<HTMLSelectElement>(".goog-te-combo");
  if (!combo) return false;
  combo.value = lang;
  combo.dispatchEvent(new Event("change"));
  return true;
}

export const LanguageSelector = () => {
  const [current, setCurrent] = useState<string>(DEFAULT_LANG);

  useEffect(() => {
    loadTranslateScript();
    setCurrent(readCookieLang());
  }, []);

  const handleChange = (lang: string) => {
    setCurrent(lang);
    setCookieLang(lang);

    // Try to switch instantly; if the widget isn't ready yet, reload so the
    // cookie-driven translation is applied on next load.
    let applied = false;
    let attempts = 0;
    const tick = () => {
      applied = applyLanguage(lang);
      attempts += 1;
      if (!applied && attempts < 20) {
        setTimeout(tick, 150);
      } else if (!applied) {
        window.location.reload();
      }
    };
    tick();
  };

  return (
    <>
      {/* Hidden widget that Google Translate mounts into. */}
      <div id="google_translate_element" className="sr-only" aria-hidden="true" />
      <Select value={current} onValueChange={handleChange}>
        <SelectTrigger
          className="h-9 w-auto gap-2 border-border/60 px-2.5 text-sm font-medium notranslate"
          aria-label="Select language"
        >
          <Globe className="h-4 w-4 text-muted-foreground" />
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="max-h-80 notranslate">
          {LANGUAGES.map((lang) => (
            <SelectItem key={lang.code} value={lang.code}>
              {lang.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};
