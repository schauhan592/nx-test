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
  line: string;
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
}

type ThemeMode = 'dark' | 'light';

const pallete: ColorsPalette = {
  mode: 'dark',
  primary: {
    light: '#2525EB',
    main: '#2525EB',
    dark: '#2525EB',
  },
  secondary: {
    light: '#00E55F',
    main: '#00E55F',
  },
  warning: {
    light: '#FAC044',
    main: '#FAC044',
  },
  info: {
    light: '#2D42FC',
    main: '#2D42FC',
  },
  success: {
    light: '#3FB68B',
    main: '#3FB68B',
  },
  error: {
    light: '#FF5353',
    main: '#FF5353',
  },
  background: {
    default: '#101124',
    paper: '#16182E',
    nuetral: '#16182E',
    dummyColor: '#373737',
    dialog: '#272D4D',
    line: '#1E2136',
  },
  text: {
    primary: '#FFF',
    secondary: '#A0A3C4',
  },
};

export default pallete;
