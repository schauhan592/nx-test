import TableHead from '@mui/material/TableHead';
import { styled } from '@mui/material';

const CustomTableHeader = styled(TableHead)(() => ({
  '& th': {
    backgroundColor: '#131417',
    padding: '10px',
  },
  '& .MuiTableCell-root:last-of-type': {
    borderRadius: 0,
  },
  '& .MuiTableCell-root:first-of-type': {
    borderRadius: 0,
  },
}));
export default CustomTableHeader;
