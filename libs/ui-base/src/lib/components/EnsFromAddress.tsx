import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import { Icon } from '@iconify/react';
import { Box, Tooltip, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ErrorBoundary } from './error';

type EnsFromAddressProps = {
  value: any;
  walletAddress: string;
  isAddress?: boolean;
  hrefUrl?: string;
  enableCopyFunctionality?: boolean;
  enableEthereumLink?: boolean;
};

export default function EnsFromAddress(props: EnsFromAddressProps): JSX.Element {
  const { value, walletAddress, isAddress, hrefUrl, enableCopyFunctionality, enableEthereumLink } =
    props;

  const [state, setState] = useState({
    value,
    copied: false,
  });
  const onCopy = () => {
    setState({ ...state, copied: true });
    if (state.value) {
      console.info('copied');
    }
  };
  useEffect(() => {
    setState({
      value,
      copied: false,
    });
  }, [value]);

  return (
    <ErrorBoundary>
      <Box
        style={{
          display: 'flex',

          alignContent: 'center',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Tooltip title={walletAddress}>
          <Typography
            variant={'subtitle2'}
            sx={{
              display: 'inline',
              mr: 1,
              color: 'text.primary',
            }}
          >
            {state.value}
          </Typography>
        </Tooltip>
        {enableCopyFunctionality && (
          <Box>
            <CopyToClipboard text={walletAddress} onCopy={onCopy}>
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
          </Box>
        )}
        {isAddress && enableEthereumLink && (
          <Tooltip title="View on Zapper">
            <a
              href={hrefUrl}
              target={'_blank'}
              rel="noreferrer"
              style={{ margin: '5px 0px 0px 5px' }}
            >
              <OpenInNewOutlinedIcon
                sx={{
                  width: 16,
                  height: 16,
                  ml: 0.5,
                  flexShrink: 0,
                  color: 'text.secondary',
                }}
              />
            </a>
          </Tooltip>
        )}
      </Box>
    </ErrorBoundary>
  );
}
