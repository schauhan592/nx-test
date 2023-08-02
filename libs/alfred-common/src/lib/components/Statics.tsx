import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';

type PrimaryColors = 'green' | 'white' | 'red';

interface StaticsProps {
  color?: PrimaryColors;
  heading: string;
  value: string;
  loading?: boolean;
  size?: 'sm' | 'lg';
}

const colors: Record<PrimaryColors, string> = {
  green: '#67F58F',
  red: '#FF4F39',
  white: '#FFF',
};

export default function Statics({
  color = 'white',
  heading,
  value,
  loading = false,
  size = 'lg',
}: StaticsProps) {
  return (
    <Box
      sx={{
        maxHeight: 110,
        width: size === 'sm' ? 130 : 150,
        border: '1px solid',
        borderRadius: 1,
        borderColor: 'text.secondary',
        p: 1,
        backgroundColor: 'background.default',
      }}
    >
      <Stack direction="column" spacing={2}>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {heading}
        </Typography>

        <Tooltip disableInteractive={loading} title={value}>
          <Typography
            variant="subtitle2"
            sx={{
              color: colors[color],
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {loading ? <Skeleton /> : value}
          </Typography>
        </Tooltip>
      </Stack>
    </Box>
  );
}
