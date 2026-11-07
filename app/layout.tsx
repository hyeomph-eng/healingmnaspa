import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://healingmnaspacebu.inhye400.chatgpt.site'),
  title: 'Healing M&A Spa | Cebu Premium Spa',
  openGraph: {
    title: 'Healing M&A Spa | Cebu Premium Spa',
    url: '/',
    siteName: 'Healing M&A Spa',
    locale: 'ja_JP',
    type: 'website',
    images: [{ url: '/healing-spa-share.png', width: 1200, height: 630, alt: 'Healing M&A Spa reception at One Paseo, Cebu' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Healing M&A Spa | Cebu Premium Spa',
    images: ['/healing-spa-share.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
