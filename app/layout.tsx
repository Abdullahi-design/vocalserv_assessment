import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Staff Directory - VocalServ Assessment',
  description: 'Modern staff directory application for managing organization employees',
  keywords: ['staff directory', 'employee management', 'React', 'Next.js', 'TypeScript'],
  authors: [{ name: 'Mohammed Abdullahi', url: 'abduallahimohammed.com' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}