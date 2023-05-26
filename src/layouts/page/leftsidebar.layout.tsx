'use client';

import { ThemeProvider } from '@material-tailwind/react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const LeftSidebarPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
};

export default LeftSidebarPageLayout;
