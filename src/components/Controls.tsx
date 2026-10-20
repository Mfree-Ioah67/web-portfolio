import type { MouseEvent } from "react";
import { SCENES, type SceneId } from "@/background/scenes";

export type Theme = "dark" | "light";

interface Props {
  scene: SceneId;
  onScene: (scene: SceneId) => void;
  theme: Theme;
  onToggleTheme: (e: MouseEvent<HTMLButtonElement>) => void;
}

const Moon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
  </svg>
);

const Sun = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);

export default function Controls({ scene, onScene, theme, onToggleTheme }: Props) {
  const current = SCENES.find((s) => s.id === scene)!;

  return (
    <div className="controls">
      <div className="bgswitch" role="group" aria-label="Background">
        <span className="bgswitch__label">BG: {current.label}</span>
        <span className="bgswitch__options">
          {SCENES.map((s) => (
            <button key={s.id} type="button" aria-pressed={s.id === scene} onClick={() => onScene(s.id)}>
              {s.label}
            </button>
          ))}
        </span>
      </div>
      <button
        className="themebtn"
        type="button"
        onClick={onToggleTheme}
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      >
        {theme === "dark" ? <Moon /> : <Sun />}
        {theme === "dark" ? "Dark" : "Light"}
      </button>
    </div>
  );
}
