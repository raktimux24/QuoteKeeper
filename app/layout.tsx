// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers/providers';
import { Toaster } from "@/components/ui/toaster"

// Load fonts
const inter = Inter({ subsets: ['latin'] });

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
      <body className={inter.className}>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  )
}