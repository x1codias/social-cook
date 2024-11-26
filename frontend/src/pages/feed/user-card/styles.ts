import { styled } from '@mui/material';
import { HTMLAttributes } from 'react';
import { encodeForCSS } from '../../../utils/functions/encodeUrl';

type CustomDivProps = HTMLAttributes<HTMLDivElement> & {
  recipeImage: string;
  columnSpan: number;
};

const styles = {
  RecipeImage: styled('div')<Partial<CustomDivProps>>(
    ({ recipeImage, columnSpan }) => ({
      gridColumn: `span ${columnSpan}`,
      height: `300px`,
      backgroundImage: `url(${encodeForCSS(recipeImage)})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '8px',
      overflow: 'hidden',
      cursor: 'pointer',
      position: 'relative',
      // Pseudo-element for overlay
      '&::after': {
        content: '""', // Necessary for a pseudo-element
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: `rgba(0, 0, 0, 0.3)`, // Semi-transparent black overlay
        opacity: 0, // Initially hidden
        transition: 'opacity 0.3s ease', // Smooth fade-in effect
      },

      // Hover effect to show overlay
      '&:hover::after': {
        opacity: 1, // Fully visible on hover
      },
    })
  ),
};

export default styles;
