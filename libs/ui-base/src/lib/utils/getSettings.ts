// next
import { NextApiRequestCookies } from 'next/dist/server/api-utils';
// config
import { cookiesKey, defaultSettings } from '../config';
import { SettingsValueProps } from '../components/settings/type';

// ----------------------------------------------------------------------

export const getSettings = (cookies: NextApiRequestCookies) => {
  const themeMode = getData(cookies[cookiesKey.themeMode]) || defaultSettings.themeMode;

  const themeDirection =
    getData(cookies[cookiesKey.themeDirection]) || defaultSettings.themeDirection;

  const themeColorPresets =
    getData(cookies[cookiesKey.themeColorPresets]) || defaultSettings.themeColorPresets;

  const themeLayout = getData(cookies[cookiesKey.themeLayout]) || defaultSettings.themeLayout;

  const themeContrast = getData(cookies[cookiesKey.themeContrast]) || defaultSettings.themeContrast;

  const themeStretch = getData(cookies[cookiesKey.themeStretch]) || defaultSettings.themeStretch;

  return {
    themeMode,
    themeLayout,
    themeStretch,
    themeContrast,
    themeDirection,
    themeColorPresets,
  };
};

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

// ----------------------------------------------------------------------

export const getData = (value: string | undefined) => {
  if (value === 'true' || value === 'false') {
    return JSON.parse(value);
  }
  if (value === 'undefined' || !value) {
    return '';
  }
  return value;
};
