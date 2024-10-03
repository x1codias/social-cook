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
  difficulty: {
    easy: string;
    medium: string;
    hard: string;
  };
  categories: {
    pastas: string;
    fish: string;
    meat: string;
    vegan: string;
    salads: string;
    breakfast: string;
    fingerFood: string;
    desserts: string;
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
    difficulty: {
      easy: '#508D4E',
      medium: '#FFAF00',
      hard: '#EF4040',
    },
    categories: {
      pastas: '#EED2A6',
      fish: '#9ACFFF',
      meat: '#F2BFFB',
      vegan: '#E5F679',
      salads: '#B4FF9A',
      breakfast: '#FFCA8C',
      fingerFood: '#EEC8AF',
      desserts: '#FF938B',
    },
  },
});

export default theme;
