import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Scalable Capital · Personalised Investment Feed',
  description:
    'AI-powered newsfeed personalised to your portfolio — a product concept by Berkay Onen.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
