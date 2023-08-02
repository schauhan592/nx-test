import { Button, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: any }) {
  return (
    <Stack
      sx={{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h5" sx={{ color: 'text.secondary' }}>
        Something went wrong :)
      </Typography>
      {/* <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        <b>{error?.name}</b>:{error?.message}
      </Typography> */}
      <Button size="large" variant="contained" sx={{ mt: 2 }} onClick={resetErrorBoundary}>
        Retry
      </Button>
    </Stack>
  );
}

type ErrorBoundaryProviderProps = {
  children: ReactNode;
  fallBack?: React.FC;
  onReset?(): void;
};
const ErrorBoundaryProvider = ({ children, fallBack, onReset }: ErrorBoundaryProviderProps) => {
  return (
    <ErrorBoundary onReset={onReset} FallbackComponent={fallBack || ErrorFallback}>
      {children}
    </ErrorBoundary>
  );
};

export default ErrorBoundaryProvider;
