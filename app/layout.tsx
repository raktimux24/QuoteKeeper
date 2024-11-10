// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Providers } from './providers/providers';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'Quote Keeper',
  description: 'Your personal collection of inspiring quotes',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}