// app/components/dashboard/ThemeToggle.tsx
import { Button } from "@/components/ui/button";
import { SunIcon, MoonIcon } from "lucide-react";

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onToggle: () => void;
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onToggle}
      className="w-10 h-10 rounded-full hover:bg-amber-100 dark:hover:bg-amber-500/10"
    >
      {theme === 'light' ? (
        <MoonIcon className="h-5 w-5 text-amber-600 dark:text-amber-400" />
      ) : (
        <SunIcon className="h-5 w-5 text-amber-600 dark:text-amber-400" />
      )}
    </Button>
  );
}