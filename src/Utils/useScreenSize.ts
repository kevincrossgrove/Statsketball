"use client";

import { useEffect, useState } from "react";

type Sizes = "xs" | "sm" | "md" | "lg";

export default function useScreenSize() {
  const [screenSize, setScreenSize] = useState<Sizes | null>(() => {
    if (typeof window === "undefined") return null;

    const screenWidth = window.innerWidth;

    if (screenWidth >= 1024) {
      return "lg";
    } else if (screenWidth < 1024 && screenWidth >= 768) {
      return "md";
    } else if (screenWidth < 768 && screenWidth > 576) {
      return "sm";
    } else if (screenWidth < 576) {
      return "xs";
    } else {
      return null;
    }
  });

  const sizeHandler = (size: Sizes) => (e: MediaQueryListEvent) => {
    if (!e.matches) return;

    setScreenSize(size);
  };

  useEffect(() => {
    const mediaQueryXS = window.matchMedia("(max-width: 640px)"); //  If size is below - xs screen
    const mediaQuerySM = window.matchMedia(
      "(min-width: 640px) and (max-width: 768px)"
    ); // If size is between - sm screen
    const mediaQueryMD = window.matchMedia(
      "(min-width: 768px) and (max-width: 1024px)"
    ); // If size is between - md screen
    const mediaQueryLG = window.matchMedia("(min-width: 1024px)"); // If size is above - lg screen

    const handleXS = sizeHandler("xs");
    const handleSM = sizeHandler("sm");
    const handleMD = sizeHandler("md");
    const handleLG = sizeHandler("lg");

    mediaQueryXS.addEventListener("change", handleXS);
    mediaQuerySM.addEventListener("change", handleSM);
    mediaQueryMD.addEventListener("change", handleMD);
    mediaQueryLG.addEventListener("change", handleLG);

    return () => {
      mediaQueryXS.removeEventListener("change", handleXS);
      mediaQuerySM.removeEventListener("change", handleSM);
      mediaQueryMD.removeEventListener("change", handleMD);
      mediaQueryLG.removeEventListener("change", handleLG);
    };
  }, []);

  return screenSize;
}
