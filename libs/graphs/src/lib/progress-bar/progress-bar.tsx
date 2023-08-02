import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled as MUIStyles } from '@mui/material/styles';

/* eslint-disable-next-line */
export interface ProgressBarProps {
  value: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ value }: ProgressBarProps) => {
  return <BorderLinearProgress variant="determinate" value={value} />;
};

const BorderLinearProgress = MUIStyles(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#ffa131' : '#308fe8',
  },
}));

export default ProgressBar;
