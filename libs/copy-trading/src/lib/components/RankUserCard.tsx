import { AddressAvatar } from '@alfred/alfred-common';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { truncateAddress } from '@sdf/base';
import NextLink from 'next/link';
interface RankUserCardProps {
  address: string;
  image?: string;
}

export default function RankUserCard({ address }: RankUserCardProps) {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <NextLink href={`/copy-trading/${address}`} passHref>
        <a rel="noopener noreferrer">
          <Box sx={{ cursor: 'pointer' }}>
            <AddressAvatar address={address} size="lg" variant="rounded" />
          </Box>
        </a>
      </NextLink>
      <NextLink href={`/copy-trading/${address}`} passHref>
        <a rel="noopener noreferrer">
          <Box sx={{ cursor: 'pointer' }}>
            <Typography variant="subtitle2">{truncateAddress(address)}</Typography>
          </Box>
        </a>
      </NextLink>
    </Stack>
  );
}
