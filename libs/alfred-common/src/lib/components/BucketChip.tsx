import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/system';
import Tooltip from '@mui/material/Tooltip';
import { useEffect, useState } from 'react';
import { PoolToken } from '../@types';

type ChipSize = 'sm' | 'lg';
export type BucketChipProps = {
  max: number;
  tokens: PoolToken[];
  size?: ChipSize;
  defaultTitle?: string;
  strategyId?: string;
  layout?: 'h' | 'v';
  description?: string;
  descriptionWithTooltip?: string;
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
const CustomAvatarGroup = styled(AvatarGroup)(({ size }) => ({
  '.MuiAvatarGroup-avatar:first-of-type': {
    ...(size === 'lg' ? { width: 38, height: 38 } : { width: 24, height: 24 }),
  },
  '.MuiAvatarGroup-avatar': {
    border: 'none',
  },
}));

export default function BucketChips({
  tokens,
  size = 'lg',
  defaultTitle,
  max,
  layout = 'h',
  description,
  descriptionWithTooltip = undefined,
}: BucketChipProps) {
  const [title, setTitle] = useState<string>('');
  useEffect(() => {
    if (tokens) {
      let newTitle = '';
      tokens?.forEach((_token) => {
        newTitle = newTitle !== '' ? `${newTitle}/${_token?.symbol}` : `${_token?.symbol}`;
      });

      setTitle(newTitle);
    }
  }, [tokens]);

  if (!tokens) return <Typography variant="subtitle1">-</Typography>;

  const handleClick = () => {
    // strategyId && push(`/strategy/${strategyId}`);
  };

  return (
    <Stack
      direction={layout === 'h' ? 'row' : 'column'}
      alignItems={layout === 'h' ? 'center' : 'start'}
      spacing={size === 'sm' ? 0.5 : 2}
    >
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <CustomAvatarGroup max={max} size={size}>
        {tokens?.map((_token) => {
          return (
            <Tooltip key={_token?.symbol} title={_token?.symbol}>
              <Avatar
                sx={{ ...(size === 'lg' ? { width: 38, height: 38 } : { width: 24, height: 24 }) }}
                alt={_token?.symbol}
                src={`/assets/crypto-logo/${_token?.symbol}.svg`}
              />
            </Tooltip>
          );
        })}
      </CustomAvatarGroup>
      <Stack direction="column">
        <Typography
          variant="subtitle2"
          onClick={handleClick}
          sx={{
            cursor: 'pointer',
            ...(size === 'sm' && { fontSize: 12 }),
          }}
        >
          {defaultTitle || title}
        </Typography>
        {description &&
          (descriptionWithTooltip ? (
            <Tooltip title={description}>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                {description}
              </Typography>
            </Tooltip>
          ) : (
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {description}
            </Typography>
          ))}
      </Stack>
    </Stack>
  );
}
