import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { StructuredData } from '@/components/seo/StructuredData';

const inter = Inter({ subsets: ['latin'] });

// Your existing SEO metadata
export const metadata: Metadata = {
  metadataBase: new URL('https://timemaster.app'),
  title: {
    default: 'TimeMaster - Focus Timer Collection for Productivity',
    template: '%s | TimeMaster',
  },
  description:
    'Free collection of productivity timers: Pomodoro, 50/10, 60/10, 90/20, Flowtime, and more. No signup required. Boost your focus and productivity today.',
  keywords: ['focus timer', 'productivity timer', 'pomodoro', 'time management', 'work timer'],
  authors: [{ name: 'TimeMaster' }],
  creator: 'TimeMaster',
  publisher: 'TimeMaster',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://timemaster.app',
    siteName: 'TimeMaster',
    title: 'TimeMaster - Focus Timer Collection for Productivity',
    description:
      'Free collection of productivity timers: Pomodoro, 50/10, 60/10, 90/20, Flowtime, and more. No signup required.',
    images: [
      {
        url: '/og-home.png',
        width: 1200,
        height: 630,
        alt: 'TimeMaster - Focus Timer Collection',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TimeMaster - Focus Timer Collection for Productivity',
    description:
      'Free collection of productivity timers: Pomodoro, 50/10, 60/10, 90/20, Flowtime, and more.',
    images: ['/og-home.png'],
    creator: '@timemaster',
  },
  icons: {
    icon: '/icons/favicon.ico',
    apple: '/icons/icon-192.png',
  },
  manifest: '/manifest.json',
};

// Critical CSS string (you can extract this later if needed)
const criticalCSS = `
  /* Critical above-the-fold styles */
  body { margin: 0; font-family: system-ui, sans-serif; }
  .timer-display { font-size: 4rem; font-weight: bold; }
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData type="WebApplication" page="home" />

        {/* 🔥 Inline critical CSS */}
        <style dangerouslySetInnerHTML={{ __html: criticalCSS }} />
      </head>

      <body className={inter.className}>
        <ThemeProvider>
          <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 transition-colors">
            <Header />
            {children}
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
