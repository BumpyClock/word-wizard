"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SiteSettings } from "@/components/theme/SiteSettings";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Language", path: "/language" },
  { label: "Math", path: "/math" },
  { label: "Science", path: "/science" },
];

export function Header() {
  const pathname = usePathname();
  
  return (
    <header className="border-b sticky top-0 z-50 backdrop-blur-sm" style={{ 
      backgroundColor: 'var(--color-scheme-background, white)',
      borderColor: 'var(--color-scheme-neutral, #e5e7eb)'
    }}>
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">Learning Games Hub</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            {navItems.map((item) => {
              const isActive = pathname === item.path || 
                (item.path !== "/" && pathname?.startsWith(item.path));
              
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={cn(
                    "flex items-center text-sm font-medium transition-colors hover:text-primary",
                    isActive ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
        
        <div className="flex items-center gap-2">
          <SiteSettings />
        </div>
      </div>
    </header>
  );
}