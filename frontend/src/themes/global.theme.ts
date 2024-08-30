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
    light: string;
    dark: string;
  };
  customBackground: Partial<TypeBackground> & {
    input: string;
  };
  customText: { button: string } & Partial<TypeText>;
  customError: Partial<PaletteColorOptions> & {
    main: string;
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
      light: '#FFE0D0',
      dark: '#CE4801',
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
    customError: {
      main: '#FF0000',
    },
  },
});

export default theme;
