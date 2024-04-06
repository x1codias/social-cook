import {
  PaletteColorOptions,
  TypeBackground,
  TypeText,
  createTheme,
} from '@mui/material';

type NewPalleteOptions = {
  default: Partial<PaletteColorOptions> | TypeText;
  background: Partial<TypeBackground> | TypeText;
  text: Partial<TypeText>;
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
      primary: '',
      secondary: '',
      light: '',
      dark: '',
      contrastText: '',
    },
    background: {
      default: '#faf3f0',
      paper: '',
    },
    text: {
      primary: '#4a4a4a',
      secondary: '',
      disabled: '',
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
