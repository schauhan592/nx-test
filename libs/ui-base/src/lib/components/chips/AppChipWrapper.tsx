import { ChipProps, Skeleton, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import React, { Suspense } from 'react';

const AppChipComponent = dynamic(() => import('./AppChip'), {
  // suspense: true
});

export default function AppChip(props: ChipProps) {
  return (
    <Suspense
      fallback={
        <Skeleton width="100px">
          <Typography>.</Typography>
        </Skeleton>
      }
    >
      <AppChipComponent {...props} />
    </Suspense>
  );
}
