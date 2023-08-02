import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function Tooltip(theme: Theme) {
  // const isLight = theme.palette.mode === 'light';

  return {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#131417', // TODO: replace hardcode value
          border: '1px solid rgba(255, 255, 255, 0.15)',
          fontSize: '12px',
          fontWeight: 'normal',
          color: '#FFF',
        },
        arrow: {
          color: '#131417',
        },
      },
    },
  };
}
