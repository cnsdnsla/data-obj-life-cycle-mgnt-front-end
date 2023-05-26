import './globals.css';
import LeftSidebarPageLayout from '@/layouts/page/leftsidebar.layout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <LeftSidebarPageLayout>{children}</LeftSidebarPageLayout>;
}
