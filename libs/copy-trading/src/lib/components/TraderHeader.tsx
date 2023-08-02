import { AddressAvatar } from '@alfred/alfred-common';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { truncateAddress } from '@sdf/base';

interface Props {
  address: string;
  name?: string;
  followers?: number;
}

export default function TraderHeader({ address, name, followers }: Props) {
  // const { follow, loading, error } = useFollowTrader({
  //   followingTrader: address as string,
  //   walletAddress: connectedUserAddress || '',
  //   fundManagerProxy: fundManagerProxy || '',
  //   chainId: PRIMARY_ARBITRUM_CHAIN_ID,
  // });

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <AddressAvatar address={address} size="xl" variant="rounded" />

      <Stack direction="column">
        <Typography variant="h4">{name || truncateAddress(address)}</Typography>
        {/* <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {followers} followers
        </Typography> */}
      </Stack>

      {/* <Box sx={{ alignSelf: 'baseline', maxWidth: 200 }}>
        <Stack direction="column" spacing={1}>
          <LoadingButton
            variant="outlined"
            size="small"
            loading={loading}
            onClick={handleBtnOnClick}
          >
            Follow
          </LoadingButton>

          {!loading && error && (
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {error}
            </Typography>
          )}
        </Stack>
      </Box> */}
    </Stack>
  );
}
