import { forwardRef } from 'react';
import NextLink from 'next/link';
import { useTheme } from '@mui/material/styles';
import { Avatar as MUIAvatar, AvatarProps, Typography } from '@mui/material';
import { AvatarColor } from './Avatar';
import { Box, Stack } from '@mui/system';
// import VerifiedIcon from '@mui/icons-material/Verified';
import CopyClipboard from '../CopyClipboard';
import { GradientAvatar } from '@sdf/base';

type AvatarProfilVariant = 'primary' | 'secondary' | 'inline' | 'link';

export interface AvatarProfileProps extends AvatarProps {
  color?: AvatarColor;
  title: string;
  subTitle?: string;
  isAddress?: boolean;
  isCopy?: boolean;
  type?: AvatarProfilVariant;
  link?: string;
  hrefUrl?: string;
  handleClick?(): void;
}

const AvatarProfileComponent = forwardRef<HTMLDivElement, AvatarProfileProps>(
  (
    {
      color = 'default',
      title,
      subTitle,
      isCopy = false,
      isAddress = false,
      type = 'primary',
      link,
      hrefUrl,
      children,
      sx,
      ...other
    },
    ref
  ) => {
    const theme = useTheme();

    const avatar =
      color === 'default' ? (
        !other.src ? (
          <GradientAvatar uid={'random'} size={40} />
        ) : (
          <MUIAvatar ref={ref} sx={sx} {...other}>
            {children}
          </MUIAvatar>
        )
      ) : (
        <MUIAvatar
          ref={ref}
          sx={{
            fontWeight: theme.typography.fontWeightMedium,
            color: theme.palette[color].contrastText,
            backgroundColor: theme.palette[color].main,
            ...sx,
          }}
          {...other}
        >
          {children}
        </MUIAvatar>
      );

    function getVariant() {
      switch (type) {
        case 'primary':
          return (
            <Stack direction="column">
              <Typography variant="subtitle1">{title}</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {isCopy ? (
                  <CopyClipboard value={subTitle} isAddress={isAddress} hrefUrl={hrefUrl} />
                ) : (
                  subTitle
                )}
              </Typography>
            </Stack>
          );

        case 'secondary':
          return (
            <Stack direction="column">
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {title}
              </Typography>
              <Typography variant="subtitle1">
                {isCopy ? (
                  <CopyClipboard value={subTitle} isAddress={isAddress} hrefUrl={hrefUrl} />
                ) : (
                  subTitle
                )}
              </Typography>
            </Stack>
          );

        case 'inline':
          return (
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant={'subtitle1'}>{title}</Typography>{' '}
              {/* TODO; Add verification via conditionally handling */}
              {/* <VerifiedIcon sx={{ height: 20, width: 20, color: 'primary.main' }} /> */}
            </Stack>
          );
        case 'link':
          return (
            <Stack direction="column">
              <Box sx={{ cursor: 'pointer' }}>
                <NextLink href={link || '#'}>
                  <Typography variant="subtitle1">{title}</Typography>
                </NextLink>
              </Box>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {isCopy ? (
                  <CopyClipboard value={subTitle} isAddress={isAddress} hrefUrl={hrefUrl} />
                ) : (
                  subTitle
                )}
              </Typography>
            </Stack>
          );

        default:
          return (
            <Stack direction="column">
              <Typography variant="subtitle1">{title}</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {isCopy ? (
                  <CopyClipboard value={subTitle} isAddress={isAddress} hrefUrl={hrefUrl} />
                ) : (
                  subTitle
                )}
              </Typography>
            </Stack>
          );
      }
    }

    return (
      <Stack direction="row" alignItems="center" spacing={1}>
        <Box>{avatar}</Box>
        {getVariant()}
      </Stack>
    );
  }
);

export default AvatarProfileComponent;
