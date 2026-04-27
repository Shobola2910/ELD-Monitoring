import { useState, useCallback } from "react";

export function useToasts() {
  const [toasts, setToasts] = useState([]);

  const toast = useCallback((title, msg = "", type = "info", duration = 4500) => {
    const id = Date.now() + Math.random();
    setToasts(t => [...t, { id, title, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), duration);
  }, []);

  const dismiss = useCallback((id) => setToasts(t => t.filter(x => x.id !== id)), []);

  return { toasts, toast, dismiss };
}
