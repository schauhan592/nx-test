import { TLink } from '@sdf/base';
import { ReactNode } from 'react';
import SideDrawer from '../../components/SideDrawer';

type Props = {
  children: ReactNode;
  breadCrumbLinks?: TLink[];
  heading?: string;
  subHeading?: string;
};

export default function CopyTradingLayout({ children }: Props) {
  return <SideDrawer>{children}</SideDrawer>;
}
