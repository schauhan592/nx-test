import Chip, { ChipProps } from '@mui/material/Chip';

const AppChipComponent: React.FC<ChipProps> = ({ sx, label, variant, ...others }) => (
  <Chip sx={sx} label={label} variant={variant} {...others} />
);

export default AppChipComponent;
