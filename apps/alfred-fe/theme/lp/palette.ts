import { blue, green, orange } from '@mui/material/colors';

interface PaletteColor {
  light?: string;
  main: string;
  dark?: string;
  contrastText?: string;
}

interface BackgroundColor {
  default: string;
  paper: string;
  nuetral: string;
  dummyColor: string;
  dialog: string;
}

interface TextColor {
  primary: string;
  secondary: string;
}

interface ColorsPalette {
  mode: ThemeMode;
  primary: PaletteColor;
  secondary: PaletteColor;
  warning: PaletteColor;
  info: PaletteColor;
  success: PaletteColor;
  error: PaletteColor;
  text: TextColor;
  background: BackgroundColor;
  green: { [index: number]: string };
}

type ThemeMode = 'dark' | 'light';

const pallete: ColorsPalette = {
  mode: 'dark',
  primary: {
    light: '#3772FF',
    main: '#3772FF',
    dark: '#3772FF',
  },
  secondary: {
    light: '#00E55F',
    main: '#00E55F',
  },
  warning: {
    light: orange[400],
    main: orange[400],
  },
  info: {
    light: blue[400],
    main: blue[400],
  },
  success: {
    light: green[400],
    main: green[400],
  },
  error: {
    light: '#FF4F39',
    main: '#FF4F39',
  },
  background: {
    default: '#0D0D0B',
    paper: '#191919',
    nuetral: '#0D0D0B',
    dummyColor: '#373737',
    dialog: '#373737',
  },
  text: {
    primary: '#FFF',
    secondary: '#999999',
  },
  green: {
    400: '#00BC4E',
  },
};

export default pallete;
