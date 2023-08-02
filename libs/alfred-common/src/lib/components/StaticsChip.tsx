import { InfoOutlined } from '@mui/icons-material';
import { Tooltip, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';

type StaticsChipsProps = {
  title: string;
  value: string;
  tooltipTitle?: string;
};

export default function StaticsChip({
  title,
  value,

  tooltipTitle = undefined,
}: StaticsChipsProps) {
  return (
    <Box sx={{ border: '1px solid', borderRadius: 1, p: 1.5, borderColor: 'text.secondary' }}>
      <Stack direction="column" spacing={1}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2">{title}</Typography>
          {tooltipTitle && (
            <Tooltip title={tooltipTitle}>
              <InfoOutlined sx={{ fontSize: 16 }} />
            </Tooltip>
          )}
        </Stack>
        <Typography variant="h5">{value}</Typography>
      </Stack>
    </Box>
  );
}
