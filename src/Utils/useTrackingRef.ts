import { useEffect, useRef } from "react";

export default function useTrackingRef<T>({ value }: { value: T }) {
  const valueToTrackRef = useRef(value);

  useEffect(() => {
    valueToTrackRef.current = value;
  }, [value]);

  return valueToTrackRef;
}
