"use client";

import { useEffect } from "react";
import { Crew } from "@/lib/crew/engine";

/** Mounts the five-cursor live build. Render once, after all page content. */
export default function CursorCrew() {
  useEffect(() => {
    let crew: Crew | null = null;
    try {
      crew = Crew.start();
    } catch (err) {
      console.error("[cursor crew]", err);
      document.documentElement.classList.remove("mc", "mc-live");
    }
    return () => crew?.destroy();
  }, []);

  return null;
}
