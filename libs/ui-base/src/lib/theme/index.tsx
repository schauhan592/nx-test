import { ReactNode, useMemo } from 'react';
// @mui
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeOptions, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
// hooks
import useSettings from '../hooks/useSettings';
//
import breakpoints from './breakpoints';
import componentsOverride from './overrides';
import shadows, { customShadows } from './shadows';

// ----------------------------------------------------------------------

type Props = {
  children: ReactNode;
  themeConfig?: { ctThemePalette: any; ctThemeTypo: any; lpThemePalette: any; lpThemeTypo: any };
};

export default function ThemeProvider({ children, themeConfig }: Props) {
  const { themeMode, themeDirection } = useSettings();

  const palette = themeMode === 'ct' ? themeConfig?.ctThemePalette : themeConfig?.lpThemePalette;
  const typography = themeMode === 'ct' ? themeConfig?.ctThemeTypo : themeConfig?.lpThemeTypo;

  const themeOptions: ThemeOptions = useMemo(
    () => ({
      palette: palette,
      typography: typography,
      breakpoints,
      shape: { borderRadius: 8 },
      direction: themeDirection,
      shadows: shadows.light,
      customShadows: customShadows.light,
    }),
    [themeDirection, themeMode]
  );

  const theme = createTheme(themeOptions);

  theme.components = componentsOverride(theme);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}
