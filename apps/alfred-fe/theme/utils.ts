import { SettingsValueProps } from '@sdf/base';

export function pxToRem(value: number) {
  return `${value / 16}rem`;
}

export function responsiveFontSizes({ sm, md, lg }: { sm: number; md: number; lg: number }) {
  return {
    '@media (min-width:600px)': {
      fontSize: pxToRem(sm),
    },
    '@media (min-width:900px)': {
      fontSize: pxToRem(md),
    },
    '@media (min-width:1200px)': {
      fontSize: pxToRem(lg),
    },
  };
}

export const getSettingsDefault = () => {
  const defaultSetting: SettingsValueProps = {
    themeMode: 'lp',
    themeColorPresets: 'default',
    themeDirection: 'ltr',
    themeLayout: 'horizontal',
    themeStretch: false,
    themeContrast: 'default',
  };
  return defaultSetting;
};
