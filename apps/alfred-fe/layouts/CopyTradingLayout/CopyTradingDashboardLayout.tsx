import SideDrawer from '../../components/SideDrawer';
import { ReactNode } from 'react';

interface DashboardLayoutProps {
  children: ReactNode;
  heading?: string;
  subHeading?: string;
}

export default function DashboardPageLayout({ children }: DashboardLayoutProps) {
  return <SideDrawer>{children}</SideDrawer>;
}
