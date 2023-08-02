//
import { Skeleton } from '@mui/material';
import { Avatar, AvatarProps } from './avatar';
import GradientAvatar from './GradientAvatar';

// ----------------------------------------------------------------------

interface ExtendedAvatarProps extends AvatarProps {
  image?: string;
  isLoading?: boolean;
  username?: string;
  size?: number;
}

export default function MyAvatar({
  image,
  isLoading,
  size,
  username,
  ...other
}: ExtendedAvatarProps) {
  if (isLoading) return <Skeleton variant="circular" width={40} height={40} />;
  return !image ? (
    <GradientAvatar uid={'random'} size={size} {...other} />
  ) : (
    <Avatar src={image} alt={'safemoon'} color={'default'} {...other}>
      {username}
    </Avatar>
  );
}
