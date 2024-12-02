import { useEffect, useState } from "react";

export const useDebounce = <T,>(value: T, delay = 500) => {
  const [isDebounceValue, setIsDebounceVale] = useState<T>(value);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDebounceVale(value);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  return isDebounceValue;
};
