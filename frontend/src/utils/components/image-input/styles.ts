import { alpha, styled } from '@mui/system';
import theme from '../../../themes/global.theme';
import { HTMLProps } from 'react';

type CustomDivProps = HTMLProps<HTMLDivElement> & {
  imgUrl: string | null;
};

const styles = {
  ImageContainer: styled('div')<Partial<CustomDivProps>>(
    ({ imgUrl }) => ({
      flexGrow: 1,
      width: '100%',
      height: '360px',
      backgroundImage: `url(${imgUrl})`,
      backgroundColor: theme.palette.customBackground.input,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '8px',
      border: `3px solid ${theme.palette.default.dark}`,
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      position: 'relative',
      '&:hover::after':
        imgUrl && imgUrl.trim().length > 0
          ? {
              content: '""',
              width: '100%',
              height: '100%',
              position: 'absolute',
              backgroundImage: `linear-gradient(90deg, ${alpha(
                theme.palette.default.light,
                0.6
              )}, transparent), linear-gradient(260deg, ${alpha(
                theme.palette.default.light,
                0.6
              )}, transparent)`,
              borderRadius: '8px',
              zIndex: 1, // Ensure the gradient overlay is above the image
            }
          : {},
    })
  ),
};

export default styles;
