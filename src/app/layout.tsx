
import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MotionVerse | Motion That Matters',
  description: 'A cinematic motion design portfolio experience showcasing high-end motion graphics, 3D experiences, and digital storytelling.',
  metadataBase: new URL('https://motionverse.design'),
  openGraph: {
    title: 'MotionVerse | Motion That Matters',
    description: 'A cinematic motion design portfolio experience showcasing high-end motion graphics, 3D experiences, and digital storytelling.',
    url: 'https://motionverse.design',
    siteName: 'MotionVerse',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'MotionVerse Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MotionVerse | Motion That Matters',
    description: 'A cinematic motion design portfolio experience showcasing high-end motion graphics, 3D experiences, and digital storytelling.',
    images: ['/og-image.jpg'],
  },
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Syncopate:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
