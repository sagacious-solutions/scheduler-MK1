import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    if (replace) {
      setHistory((old) => {
        old.pop();
        return [...old, newMode];
      });
      setMode(newMode);
      return;
    }

    setHistory((old) => {
      return [...old, newMode];
    });
    setMode(newMode);
  };

  // Sets us back to empty or just after empty
  const resetTo = (newMode) => {
    if (newMode === "EMPTY") {
      setHistory([newMode]);
      setMode(newMode);
      return;
    }
    setHistory(["EMPTY", newMode]);
    setMode(newMode);
  };

  const back = () => {
    if (mode === initial) {
      return;
    }

    setMode(history[history.length - 2]);

    setHistory((old) => {
      old.pop();
      return old;
    });
  };

  const show = () => {
    return history;
  };

  return { mode, transition, back, resetTo, show };
}
