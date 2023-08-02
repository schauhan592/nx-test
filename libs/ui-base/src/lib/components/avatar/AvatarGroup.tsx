import * as React from 'react';
import Avatar, { AvatarProps } from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';

export interface AvatarGroupPersonType {
  image: string;
  alt: string;
  id: number | string;
}

export enum AvatarSizeEnum {
  SMALL,
  MEDIUM,
  LARGE,
}

export interface AvatarGroupProps extends AvatarProps {
  max?: number;
  persons: AvatarGroupPersonType[];
  size: AvatarSizeEnum;
}

const AvatarSize = {
  [AvatarSizeEnum.SMALL]: {
    width: 24,
    height: 24,
  },
  [AvatarSizeEnum.MEDIUM]: {
    width: 38,
    height: 38,
  },
  [AvatarSizeEnum.LARGE]: {
    width: 56,
    height: 56,
  },
};

export default function GroupAvatars({ max, persons, size, ...others }: AvatarGroupProps) {
  return (
    <AvatarGroup max={max || 4} {...others}>
      {persons?.map(({ image, alt, id }, index) => {
        return <Avatar sx={{ ...AvatarSize[size] }} key={id || index} alt={alt} src={image} />;
      })}
    </AvatarGroup>
  );
}
