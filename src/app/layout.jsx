import { Montserrat } from 'next/font/google';
import './globals.css';
import Image from 'next/image';
import { AuthProvider } from '@/lib/AuthProvider';

export const metadata = {
  title: 'Movie App',
  description: 'Cytric Technical Assessment',
};
const montserrat = Montserrat({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.className} h-screen bg-[#093545] antialiased flex flex-col items-center relative`}
      >
        <AuthProvider>
          <main className="flex flex-col h-full z-20 w-full">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
