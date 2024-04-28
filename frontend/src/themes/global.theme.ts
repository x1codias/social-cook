import {
  PaletteColorOptions,
  TypeBackground,
  TypeText,
  createTheme,
} from '@mui/material';

type NewPalleteOptions = {
  default: Partial<PaletteColorOptions> & {
    primary: string;
    secondary: string;
  };
  customBackground: Partial<TypeBackground> & { input: string };
  customText: { button: string } & Partial<TypeText>;
  season?: {
    summer: Partial<PaletteColorOptions> | TypeText;
    autumn: Partial<PaletteColorOptions> | TypeText;
    winter: Partial<PaletteColorOptions> | TypeText;
    spring: Partial<PaletteColorOptions> | TypeText;
  };
};

// Merge the new palette options with the existing PaletteOptions
declare module '@mui/material/styles' {
  interface PaletteOptions extends NewPalleteOptions {}
}

// Merge the new palette options with the existing ThemeOptions
declare module '@mui/material/styles' {
  interface Theme {
    palette: PaletteOptions;
  }

  interface ThemeOptions {
    palette?: PaletteOptions;
  }
}

const theme = createTheme({
  palette: {
    default: {
      primary: '#FE8D51',
      secondary: '',
      light: '',
      dark: '',
      contrastText: '',
    },
    customBackground: {
      default: '#faf3f0',
      paper: '#E8E8E8',
      input: '#E8E8E8',
    },
    customText: {
      primary: '#5B5C7C',
      secondary: '#BFBFBF',
      disabled: '',
      button: '#FFFFFF',
    },
    season: {
      summer: {
        primary: '',
        secondary: '',
        light: '',
        dark: '',
        contrastText: '',
      },
      autumn: {
        primary: '',
        secondary: '',
        light: '',
        dark: '',
        contrastText: '',
      },
      winter: {
        primary: '',
        secondary: '',
        light: '',
        dark: '',
        contrastText: '',
      },
      spring: {
        primary: '',
        secondary: '',
        light: '',
        dark: '',
        contrastText: '',
      },
    },
  },
});

export default theme;
