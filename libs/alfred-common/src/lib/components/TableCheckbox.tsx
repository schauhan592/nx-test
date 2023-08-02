import { Checkbox } from '@mui/material';
import { styled } from '@mui/system';

const TableCheckbox = styled(Checkbox)(() => ({
  '&.Mui-checked': {
    color: '#C0C0C0',
  },
}));

export default TableCheckbox;
