import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';
import './@/app/globals.css';

export const metadata: Metadata = {
  title: 'Next.js 14 i18n',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body>{children}</body>
    </html>
  );
}
