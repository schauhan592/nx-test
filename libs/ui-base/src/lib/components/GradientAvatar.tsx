import avatar from 'gradient-avatar-v2';
import { memo } from 'react';
// @mui
import { BoxProps, Avatar as MUIAvatar } from '@mui/material';

// ----------------------------------------------------------------------
interface Props extends BoxProps {
  uid: string;
  size?: number | 150;
}

function GradientAvatar({ uid, size, ...other }: Props) {
  const avatarSVG = avatar(uid, size);
  const buff = new Buffer(avatarSVG);
  const base64data = buff.toString('base64');
  return (
    <MUIAvatar
      sx={{
        width: { xs: size, md: size },
        height: { xs: size, md: size },
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: 'common.white',
      }}
      src={`data:image/svg+xml;base64,${base64data}`}
    ></MUIAvatar>
  );
}

export default memo(GradientAvatar);
