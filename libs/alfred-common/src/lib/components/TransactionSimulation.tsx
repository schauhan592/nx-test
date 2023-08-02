import InfoOutlined from '@mui/icons-material/InfoOutlined';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { GasFee, TxMode, TXN_TYPE } from '../@types';
import { estimateApprovalGasFee } from '../services/estimateApprovalGasFee';
import { estimateRawTxGasFee } from '../services/estimateRawTxGas';
import FormControl from '@mui/material/FormControl';
import { SelectChangeEvent } from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useGetChainId } from '../hooks/index';

type Props = {
  value?: number;
  owner: string;
  rawTx?: TXN_TYPE;
  transactionSpeed: TxMode;
  handleTxSpeed: (e: SelectChangeEvent) => void;
  error?: any;
};

export default function TransactionSimulation({
  value,
  owner,
  rawTx,
  transactionSpeed,
  handleTxSpeed,
  error,
}: Props) {
  const [gasFee, setGasFee] = useState<GasFee | string>('Fetching Gas Price...');
  const chainId = useGetChainId();

  useEffect(() => {
    const interval = setInterval(() => {
      if (rawTx && !error) {
        estimateRawTxGasFee(rawTx, owner, chainId).then((gas) => {
          setGasFee(gas);
        });
      } else if (error) {
        setGasFee('Unable to calculate Gas Price');
      }

      if (value) {
        estimateApprovalGasFee(value, owner, chainId).then((gas) => {
          setGasFee(gas);
        });
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [rawTx?.data, value]);

  return (
    <Stack
      direction="column"
      sx={{
        border: '1px solid #373737',
        padding: '20px 10px',
        backgroundColor: '#191919',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginBottom: '1em',
        borderRadius: '10px',
      }}
      gap={2}
    >
      <Stack
        sx={{ width: '94%' }}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        gap={1}
      >
        <Stack
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'row',
            width: '70%',
          }}
        >
          <Box
            sx={{
              borderRadius: '50%',
              padding: '4px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#3574F3',
              marginRight: '10px',
            }}
          >
            <AttachMoneyIcon sx={{ color: 'white' }} />
          </Box>
          <Typography variant="body2" sx={{ color: 'white', fontWeight: '600' }}>
            Expected Gas Fees
          </Typography>
        </Stack>
        <Tooltip title="This is the estimated fee that you pay to submit the transaction to the network.">
          <InfoOutlined sx={{ fontSize: '16px' }} />
        </Tooltip>
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        sx={{ width: '90%', fontSize: '12px !important' }}
        justifyContent="space-between"
        gap={1}
      >
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="Medium"
            id="demo-simple-select"
            value={transactionSpeed}
            onChange={handleTxSpeed}
          >
            <FormControlLabel value="fast" control={<Radio size="small" />} label="Fast" />
            <FormControlLabel value="medium" control={<Radio size="small" />} label="Medium" />
            <FormControlLabel value="slow" control={<Radio size="small" />} label="Slow" />
          </RadioGroup>
        </FormControl>
        <Typography variant="body2">
          {typeof gasFee === 'string' ? gasFee : gasFee[transactionSpeed]}
        </Typography>
      </Stack>
    </Stack>
  );
}
