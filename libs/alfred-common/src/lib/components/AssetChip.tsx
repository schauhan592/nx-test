import { Avatar, Typography } from '@mui/material';
import { Stack } from '@mui/system';

type ChipSize = 'sm' | 'lg';
export type AssetChipProps = {
  logo?: string;
  name: string;
  symbol: string;
  size: ChipSize;
};

export default function AssetChip({ logo, size = 'lg', name, symbol }: AssetChipProps) {
  return (
    <Stack direction="row" alignItems="center" spacing={size === 'sm' ? 0.5 : 2}>
      <Avatar
        sx={{ ...(size === 'lg' ? { width: 36, height: 36 } : { width: 24, height: 24 }) }}
        alt={name}
        src={logo}
      />
      <Stack direction="column">
        <Typography variant="subtitle2">{name || '-'}</Typography>
        <Typography variant="subtitle2">{`(${symbol})`}</Typography>
      </Stack>
    </Stack>
  );
}
