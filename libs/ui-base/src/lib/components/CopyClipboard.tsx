import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import { Icon } from '@iconify/react';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { truncateAddress } from '../utils/truncateAddress';
import { getCleanAddress } from '../utils/addressTruncate';

type CopyClipboardProps = {
  value: any;
  isAddress?: boolean;
  hrefUrl?: string;
};

export default function CopyClipboard({ value, isAddress, hrefUrl }: CopyClipboardProps) {
  const [state, setState] = useState({
    value,
    copied: false,
  });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const handleCopy = () => {
    setState({ ...state, copied: true });
    if (state.value) {
      console.log('copied');
    }
    // again setting the copied status to false to make the user recopy it
    setTimeout(() => {
      setState({ ...state, copied: false });
    }, 1000);
  };
  useEffect(() => {
    setState({
      value,
      copied: false,
    });
  }, [value]);

  const renderIcons = () => {
    if (isHovered) {
      return (
        <>
          <Stack
            sx={{
              position: 'absolute',
              height: '40px',
              width: '135px',
              borderRadius: '20px',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              backdropFilter: 'blur(2px)',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              display: 'flex',
              zIndex: 1,
              mr: '10px',
            }}
            flexDirection={'row'}
            alignItems={'space-evenly'}
            justifyContent={'center'}
          >
            <CopyToClipboard text={state.value} onCopy={handleCopy}>
              {state.copied ? (
                <Tooltip title={'Copied'}>
                  <Icon
                    icon="material-symbols:library-add-check-outline"
                    width="17"
                    height="17"
                    style={{ cursor: 'pointer' }}
                  />
                </Tooltip>
              ) : (
                <Tooltip title={'Click to Copy'}>
                  <Icon
                    icon="fluent:copy-16-regular"
                    width="17"
                    height="17"
                    style={{ cursor: 'pointer' }}
                  />
                </Tooltip>
              )}
            </CopyToClipboard>
            {isAddress && (
              <Tooltip title="View on Blockchain Explorer">
                <a href={hrefUrl} target={'_blank'} rel="noreferrer">
                  <OpenInNewOutlinedIcon
                    sx={{
                      width: 16,
                      height: 16,
                      mt: 0.5,
                      flexShrink: 0,
                      color: 'text.primary',
                    }}
                  />
                </a>
              </Tooltip>
            )}
          </Stack>
        </>
      );
    } else {
      return <></>;
    }
  };

  return (
    <>
      <Stack
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={{ height: '40px', justifyContent: 'space-evenly' }}
        flexDirection={'row'}
        alignItems={'center'}
      >
        <Typography
          variant={'subtitle2'}
          sx={{
            display: 'inline',
            mr: 1,
            color: 'text.secondary',
          }}
        >
          {truncateAddress(getCleanAddress(state.value))}
        </Typography>
        {renderIcons()}
      </Stack>
    </>
  );
}
