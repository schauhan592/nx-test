import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Skeleton from '@mui/material/Skeleton';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import dynamic from 'next/dynamic';

const ErrorBoundary = dynamic(() => import('@sdf/base').then((mod) => mod.ErrorBoundary), {
  ssr: false,
});

interface CardWithErrorBoundaryProps {
  children?: React.ReactNode;
  cardSX?: any;
  variant?: 'normal' | 'custom';
  title?: string;
  value?: string;
  tooltipTitle?: string;
  valueTooltip?: string;
  loading?: boolean;
}

const CardWithErrorBoundary: React.FC<CardWithErrorBoundaryProps> = ({
  children,
  cardSX,
  variant = 'custom',
  title,
  value,
  tooltipTitle,
  valueTooltip,
  loading,
}) => {
  if (variant === 'normal') {
    return (
      <Card sx={{ ...cardSX }}>
        <CardContent>
          <Stack direction="column">
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2">{title}</Typography>
              {tooltipTitle && (
                <Tooltip title={tooltipTitle}>
                  <InfoOutlined sx={{ fontSize: 16 }} />
                </Tooltip>
              )}
            </Stack>

            {valueTooltip && !loading ? (
              <Tooltip title={valueTooltip}>
                <Typography variant="h5" sx={{ mt: 2 }}>
                  {value}
                </Typography>
              </Tooltip>
            ) : (
              <Typography variant="h5" sx={{ mt: 2 }}>
                {loading ? <Skeleton variant="rounded" /> : value}
              </Typography>
            )}

            {children}
          </Stack>
        </CardContent>
      </Card>
    );
  } else {
    return (
      <Card sx={{ height: cardSX?.height || 408, ...cardSX }}>
        <CardContent>
          <ErrorBoundary>{children}</ErrorBoundary>
        </CardContent>
      </Card>
    );
  }
};

export default CardWithErrorBoundary;
