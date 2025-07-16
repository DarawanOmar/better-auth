"use client";
import { useTheme } from "next-themes";
import React from "react";
import ThemeToggleButton from "./theme-toggle-button";

function ButtonModeVibe() {
  const { theme } = useTheme();
  return theme === "dark" ? (
    <ThemeToggleButton variant="circle-blur" start="top-left" />
  ) : (
    <ThemeToggleButton variant="circle-blur" start="bottom-right" />
  );
}

export default ButtonModeVibe;
