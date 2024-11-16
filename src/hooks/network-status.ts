import { useState, useEffect } from "react";

export function useNetworkStatus() {
  const [status, setStatus] = useState(navigator.onLine);
  useEffect(() => {
    const handler = () => setStatus(navigator.onLine);
    window.addEventListener("online", handler);
    window.addEventListener("offline", handler);
    return () => {
      window.removeEventListener("online", handler);
      window.removeEventListener("offline", handler);
    };
  }, []);
  return status;
}
