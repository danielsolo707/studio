
import type {Metadata} from 'next';
import { Inter, Syncopate } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const syncopate = Syncopate({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-syncopate',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'MotionVerse | Motion That Matters',
  description: 'A cinematic motion design portfolio experience.',
  keywords: ['motion design', 'portfolio', '3D graphics', 'web animation', 'Three.js'],
  authors: [{ name: 'Daniel Solo' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://motionverse.design',
    title: 'MotionVerse | Motion That Matters',
    description: 'A cinematic motion design portfolio experience featuring immersive 3D graphics and smooth animations.',
    siteName: 'MotionVerse',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MotionVerse Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MotionVerse | Motion That Matters',
    description: 'A cinematic motion design portfolio experience featuring immersive 3D graphics and smooth animations.',
    images: ['/og-image.png'],
  },
  metadataBase: new URL('https://motionverse.design'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${syncopate.variable}`}>
      <body className="font-body antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
