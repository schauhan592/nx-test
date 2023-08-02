import { styled } from '@mui/material';
import TableContainer from '@mui/material/TableContainer';

const CustomTableContainer = styled(TableContainer)(() => ({
  marginTop: 3,
  border: '1px solid rgba(255, 255, 255, 0.15)',
  borderRadius: '7px',
  boxShadow: 'rgba(27, 32, 50, 0.2) 0px 6px 16px',
}));

export default CustomTableContainer;
