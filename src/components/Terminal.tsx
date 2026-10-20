import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export interface TerminalEntry {
  prompt: string;
  command: string;
  output: string;
  remote?: boolean;
}

interface Props {
  title: string;
  script: TerminalEntry[];
  className?: string;
}

const TYPE_MS = 45;
const STEP_MS = 900;
const RESTART_MS = 4000;

// Replays a short shell session: types each command, prints its output,
// then moves on. Shows the whole session at once for reduced motion.
export default function Terminal({ title, script, className = "" }: Props) {
  const reducedMotion = usePrefersReducedMotion();
  const [step, setStep] = useState(0);
  const [typed, setTyped] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;
    const done = typed >= script[step].command.length;
    const last = step === script.length - 1;
    const timer = window.setTimeout(
      () => {
        if (!done) {
          setTyped((n) => n + 1);
        } else {
          setStep(last ? 0 : step + 1);
          setTyped(0);
        }
      },
      !done ? TYPE_MS : last ? RESTART_MS : STEP_MS,
    );
    return () => window.clearTimeout(timer);
  }, [step, typed, script, reducedMotion]);

  const lines = reducedMotion
    ? script.map((entry) => ({ entry, shown: entry.command, done: true, current: false }))
    : script.slice(0, step + 1).map((entry, i) => {
        const current = i === step;
        const shown = current ? entry.command.slice(0, typed) : entry.command;
        return { entry, shown, done: shown.length === entry.command.length, current };
      });

  return (
    <div className={`terminal ${className}`} aria-hidden="true">
      <div className="terminal__bar">
        <span className="terminal__dot terminal__dot--red" />
        <span className="terminal__dot terminal__dot--yellow" />
        <span className="terminal__dot terminal__dot--green" />
        <span className="terminal__title">{title}</span>
      </div>
      <div className="terminal__body">
        {lines.map(({ entry, shown, done, current }, i) => (
          <div key={i}>
            <div className="terminal__line">
              <span className={`terminal__prompt${entry.remote ? " terminal__prompt--remote" : ""}`}>{entry.prompt}</span>{" "}
              {shown}
              {current && <span className="terminal__cursor" />}
            </div>
            {done && <div className="terminal__line terminal__output">{entry.output}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
