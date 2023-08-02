import { TLink } from '@sdf/base';
import SideDrawer from '../../components/SideDrawer';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  breadCrumbLinks?: TLink[];
  heading?: string;
  subHeading?: string;
};

export default function CopyTradingDetailsLayout({ children }: Props) {
  return <SideDrawer>{children}</SideDrawer>;
}
