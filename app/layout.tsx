import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://healingmnaspa.com'),
  title: 'Healing M&A Spa | Cebu Premium Spa',
  openGraph: {
    title: 'Healing M&A Spa | Cebu Premium Spa',
    url: 'https://healingmnaspa.com/',
    siteName: 'Healing M&A Spa',
    locale: 'ko_KR',
    type: 'website',
    images: [{
      url: '/healing-spa-kakao-20261110.jpg',
      width: 1200,
      height: 630,
      type: 'image/jpeg',
      alt: 'Healing M&A Spa Medical Aesthetic',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Healing M&A Spa | Cebu Premium Spa',
    images: ['/healing-spa-kakao-20261110.jpg'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
