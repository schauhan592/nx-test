import { IconButton } from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
//
import Iconify from './Iconify';

export default function SettingMode() {
  const { themeMode, onToggleMode } = useSettings();

  return (
    <IconButton
      color="inherit"
      onClick={onToggleMode}
      sx={{ width: 40, height: 40, border: 1, borderColor: 'primary.dark' }}
    >
      <Iconify
        icon={themeMode === 'lp' ? 'ph:sun-duotone' : 'ph:moon-duotone'}
        width={28}
        height={28}
      />
    </IconButton>
  );
}
