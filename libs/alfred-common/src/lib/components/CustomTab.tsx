import { styled } from '@mui/material';
import Tab from '@mui/material/Tab';

const CustomTab = styled(Tab)(() => ({
  textAlign: 'center',
  borderRadius: '2px',
  padding: 0,
  color: 'white',
  fontSize: 13,
  width: 110,
  minHeight: 40,
}));

export default CustomTab;
