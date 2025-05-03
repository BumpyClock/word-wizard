"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { OverlayScrollbars, ClickScrollPlugin } from "overlayscrollbars";
import { useEffect } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  // Register ClickScrollPlugin globally - must be in useEffect to prevent SSR issues
  useEffect(() => {
    OverlayScrollbars.plugin(ClickScrollPlugin);
  }, []);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
      <Toaster position="bottom-right" />
    </ThemeProvider>
  );
}