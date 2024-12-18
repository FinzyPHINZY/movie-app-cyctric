import { Inter } from 'next/font/google';
import './globals.css';
import Image from 'next/image';

export const metadata = {
  title: 'Movie App',
  description: 'Cytric Technical Assessment',
};
const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} h-screen bg-[#093545] antialiased flex flex-col items-center relative`}
      >
        <main className="flex flex-col h-full z-20 w-full">{children}</main>
      </body>
    </html>
  );
}
