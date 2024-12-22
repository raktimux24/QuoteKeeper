import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Heart, Plus, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/app/providers/theme-provider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface NavigationProps {
  onLogout: () => void;
}

export function Navigation({ onLogout }: NavigationProps) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const links = [
    { href: '/dashboard', label: 'Dashboard', icon: Home },
    { href: '/favorites', label: 'Favorites', icon: Heart },
    { href: '/add-quote', label: 'Add Quote', icon: Plus },
    { href: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/dashboard" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">
              QuoteKeeper
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {links.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center space-x-2 ${
                  pathname === href
                    ? 'text-foreground'
                    : 'text-foreground/60 transition-colors hover:text-foreground'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="flex items-center space-x-2">
            <Switch
              id="theme-toggle"
              checked={theme === 'dark'}
              onCheckedChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            />
            <Label htmlFor="theme-toggle">Dark Mode</Label>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onLogout}
            className="h-9 w-9"
            title="Logout"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>

        {/* Mobile navigation */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 border-t bg-background p-2">
          <div className="grid grid-cols-4 gap-2">
            {links.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`flex flex-col items-center py-2 px-1 text-xs ${
                  pathname === href
                    ? 'text-foreground'
                    : 'text-foreground/60 hover:text-foreground'
                }`}
              >
                <Icon className="h-5 w-5 mb-1" />
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
