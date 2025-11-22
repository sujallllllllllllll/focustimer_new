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
  metadataBase: new URL('https://focustimer.shop'),
  title: {
    default: 'FocusTimer - Every Minute Counts',
    template: '%s | FocusTimer',
  },
  description:
    'Focus Better with FocusTimer — Every Minute Counts. Free productivity timers: Pomodoro, 50/10, 60/10, 90/20, Flowtime, and more. No signup required.',
  keywords: ['focus timer', 'productivity timer', 'pomodoro', 'time management', 'work timer'],
  authors: [{ name: 'FocusTimer' }],
  creator: 'FocusTimer',
  publisher: 'FocusTimer',
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
    url: 'https://focustimer.shop',
    siteName: 'FocusTimer',
    title: 'FocusTimer - Every Minute Counts',
    description:
      'Focus Better with FocusTimer — Every Minute Counts. Free productivity timers: Pomodoro, 50/10, 60/10, 90/20, Flowtime, and more.',
    images: [
      {
        url: '/og-home.png',
        width: 1200,
        height: 630,
        alt: 'FocusTimer - Every Minute Counts',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FocusTimer - Every Minute Counts',
    description:
      'Focus Better with FocusTimer — Every Minute Counts. Free productivity timers for better focus.',
    images: ['/og-home.png'],
    creator: '@focustimer',
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
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-D4GGPVNMGQ"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-D4GGPVNMGQ');
            `,
          }}
        />
        <meta name="google-adsense-account" content="ca-pub-6308926394211577" />
        <StructuredData type="WebApplication" page="home" />

        {/* 🔥 Inline critical CSS */}
        <style dangerouslySetInnerHTML={{ __html: criticalCSS }} />
      </head>

      <body className={inter.className}>
        <ThemeProvider>
          <div className="flex flex-col min-h-screen transition-colors">
            <Header />
            {children}
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
