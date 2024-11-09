// app/components/dashboard/ThemeToggle.tsx
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onThemeChange: (theme: 'light' | 'dark') => void;
}

export function ThemeToggle({ theme, onThemeChange }: ThemeToggleProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => onThemeChange(theme === 'light' ? 'dark' : 'light')}
      className="w-10 h-10 rounded-full hover:bg-amber-100 dark:hover:bg-amber-500/10"
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5 text-amber-600 dark:text-amber-400" />
      ) : (
        <Sun className="h-5 w-5 text-amber-600 dark:text-amber-400" />
      )}
    </Button>
  );
}