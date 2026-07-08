import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { installTranslationCrashGuard } from "./lib/translationCrashGuard";

// Guard against React DOM crashes caused by Google Translate mutating nodes.
installTranslationCrashGuard();

createRoot(document.getElementById("root")!).render(<App />);
