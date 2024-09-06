import { styled } from '@mui/material';
import { HTMLAttributes } from 'react';

type CustomDivProps = HTMLAttributes<HTMLDivElement> & {
  foodImage: string;
};

const styles = {
  RecipeImage: styled('div')<Partial<CustomDivProps>>(
    ({ foodImage }) => ({
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-end',
      backgroundImage: `url(${foodImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    })
  ),
};

export default styles;
