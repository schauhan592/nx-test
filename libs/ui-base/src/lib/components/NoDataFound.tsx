import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import Iconify from './Iconify';

type Props = {
  title?: string;
};

export default function NoDataFound({ title }: Props) {
  return (
    <Stack
      height="100%"
      width="100%"
      direction="column"
      sx={{ alignItems: 'center', justifyContent: 'center', py: 3 }}
      spacing={2}
    >
      <Iconify
        icon={'solar:clipboard-remove-linear'}
        sx={{ color: 'text.secondary', fontSize: 24 }}
      />
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {title || 'No data found.'}
      </Typography>
    </Stack>
  );
}
