import InfoOutlined from '@mui/icons-material/InfoOutlined';
import Tooltip from '@mui/material/Tooltip';

type Props = {
  tooltipTitle: string;
};

export default function InfoToolTip({ tooltipTitle }: Props) {
  return (
    <Tooltip title={tooltipTitle}>
      <InfoOutlined sx={{ fontSize: 16 }} />
    </Tooltip>
  );
}
