import { Drawer } from '@mui/material';
import { ReactNode } from 'react';
import useResponsive from '../hooks/useResponsive';

export default function SidbarWrapper({ children }: { children: ReactNode }) {
  const isMobile = useResponsive('down', 'lg');
  return isMobile ? (
    <Drawer
      anchor="left"
      open={true}
      onClose={() => {}}
      PaperProps={{
        sx: { width: 300 },
      }}
    >
      {children}
    </Drawer>
  ) : (
    <>{children}</>
  );
}
