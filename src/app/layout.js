import { Inter } from 'next/font/google';
import './globals.css';

export const metadata = {
  title: 'Movie App',
  description: 'Cytric Technical Assessment',
};
const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-[100vh] antialiased`}>
        {children}
      </body>
    </html>
  );
}
