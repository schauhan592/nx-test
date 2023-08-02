// ASSETS
export * from './lib/assets';

// COMPONENTS
export * from './lib/components/animate';
export * from './lib/components/carousel';
export * from './lib/components/hook-form';

export * from './lib/components/settings';
export * from './lib/components/settings/type';
export * from './lib/components/SocialsButton';
export * from './lib/components/table';
export * from './lib/components/upload';
export * from './lib/components/tabs';
export * from './lib/components/chips';
export * from './lib/components/avatar';
export * from './lib/components/dialog';
export * from './lib/components/error';
export * from './lib/components/Breadcrumbs';

export { default as ThemeMode } from './lib/components/ThemeMode';
export { default as Breadcrumbs } from './lib/components/Breadcrumbs';
export { default as CopyClipboard } from './lib/components/CopyClipboard';
export { default as EnsFromAddress } from './lib/components/EnsFromAddress';
export { default as EmptyContent } from './lib/components/EmptyContent';
export { default as HeaderBreadcrumbs } from './lib/components/HeaderBreadcrumbs';
export { default as Iconify } from './lib/components/Iconify';
export { default as NextImage } from './lib/components/NextImage';
export { default as Image } from './lib/components/Image';
export { default as InputStyle } from './lib/components/InputStyle';
export { default as LazyImage } from './lib/components/LazyImage';
export { default as LoadingScreen } from './lib/components/LoadingScreen';
export { default as Logo } from './lib/components/Logo';
export { default as MenuPopover } from './lib/components/MenuPopover';
export { default as MyAvatar } from './lib/components/MyAvatar';
export { default as Page } from './lib/components/Page';
export { default as Label } from './lib/components/Label';
export { default as ProgressBar } from './lib/components/ProgressBar';
export { default as SearchBar } from './lib/components/SearchBar';
export { default as SearchNotFound } from './lib/components/SearchNotFound';
export { default as SocialsButton } from './lib/components/SocialsButton';
export { default as SvgIconStyle } from './lib/components/SvgIconStyle';
export { default as TextIconLabel } from './lib/components/TextIconLabel';
export { default as ThemeSettings } from './lib/components/settings';
export { default as TextMaxLine } from './lib/components/TextMaxLine';
export { default as LoadingText } from './lib/components/LoadingText';
export { default as Pulse } from './lib/components/Pluse';
export { default as ToggleTabs } from './lib/components/ToggleTabs';
export { default as StackedSlider } from './lib/components/StackedSlider';
export { default as NoDataFound } from './lib/components/NoDataFound';
export { default as FilterBar } from './lib/components/FilterBar';
export { default as GradientAvatar } from './lib/components/GradientAvatar';
export * from './lib/components/FilterCheckBoxs';
//TYPES
export { default as SuggestionSearchBar } from './lib/components/SuggestionSearchBar';
// CONTEXTS
export * from './lib/contexts/CollapseDrawerContext';
export * from './lib/contexts/SettingsContext';
export * from './lib/contexts/HistoryContext';

// HOOKS
export { default as useCountdown } from './lib/hooks/useCountdown';
export { default as useCollapseDrawer } from './lib/hooks/useCollapseDrawer';
export { default as useDateRangePicker } from './lib/hooks/useDateRangePicker';
export { default as useHistory } from './lib/hooks/useHistory';
export { default as useIsMountedRef } from './lib/hooks/useIsMountedRef';
export { default as useLocales } from './lib/hooks/useLocales';
export { default as useOffSetTop } from './lib/hooks/useOffSetTop';
export { default as useResponsive } from './lib/hooks/useResponsive';
export { default as useSettings } from './lib/hooks/useSettings';
export { default as useTable } from './lib/hooks/useTable';
export { default as useTabs } from './lib/hooks/useTabs';
export { default as useToggle } from './lib/hooks/useToggle';
export { default as useFilters } from './lib/hooks/useFilters';
export { descendingComparator, getComparator, emptyRows } from './lib/hooks/useTable';
export { default as SidbarWrapper } from './lib/components/SidebarWrapper';
export { default as CustomAccordian } from './lib/components/CustomAccordian';
export { default as DropDown } from './lib/components/DropDown';
// LOCALS
export * from './lib/locales/ar';
export * from './lib/locales/cn';
export * from './lib/locales/en';
export * from './lib/locales/fr';
export * from './lib/locales/i18n';
export * from './lib/locales/vn';

// THEME

export { default as ThemeProvider } from './lib/theme';
export { default as ComponentsOverrides } from './lib/theme/overrides';
export { default as palette } from './lib/theme/palette';

export * from './lib/theme/palette';

// UTILS
export { default as createAvatar } from './lib/utils/createAvatar';
export { default as cssStyles } from './lib/utils/cssStyles';
export { default as flattenArray } from './lib/utils/flattenArray';
export { default as getColorName } from './lib/utils/getColorName';
export { default as getColorPresets } from './lib/utils/getColorPresets';
export { default as getFileData } from './lib/utils/getFileData';
export { default as getFontValue } from './lib/utils/getFontValue';
// export { default as highlight } from './lib/utils/highlight';
export { default as uuidv4 } from './lib/utils/uuidv4';
export { default as generateQueryParams } from './lib/utils/generateQueryParams';
export { truncateAddress } from './lib/utils/truncateAddress';
export { handlePriceLabel } from './lib/utils/currency';
export { API_ENDPOINTS } from './lib/utils/apiConstants';

export * from './lib/utils/formatNumber';
export * from './lib/utils/formatTime';
export * from './lib/utils/getColorPresets';
export * from './lib/utils/getFileFormat';
export * from './lib/utils/getFontValue';
export * from './lib/utils/getSettings';
export * from './lib/utils/uuidv4';
export * from './lib/utils/addressTruncate';
export * from './lib/utils/constants';
export * from './lib/utils/contentType';
export { default as formats } from './lib/utils/format';
export { default as qsStringify } from './lib/utils/stringify';
export * from './lib/utils/filterUtils';
export { default as qsParse } from './lib/utils/qsParse';
export { default as axiosInstance } from './lib/utils/axios';
export * from './lib/utils/toAddress';
// export * from './lib/utils/currencies';
export * from './lib/utils/parseBigNumber';
export * from './lib/utils/getUniqueItems';
