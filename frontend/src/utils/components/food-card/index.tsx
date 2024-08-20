import {
  Avatar,
  //Skeleton,
  Typography,
} from '@mui/material';
import React from 'react';
import foodImage from '../../../assets/e77ef6d4207c6da257384b67b10efc67.jpeg';
import theme from '../../../themes/global.theme';

type FoodCardProps = {
  height: number;
};

const FoodCard: React.FC<FoodCardProps> = (
  props
): JSX.Element => {
  const { height } = props;

  return (
    // <Skeleton
    //   variant="rectangular"
    //   height={height}
    //   style={{
    //     borderRadius: '8px',
    //     boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    //     display: 'flex',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     overflow: 'hidden',
    //   }}
    // />
    <div
      style={{
        height: `${height}px`, // Random height
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          width: '100%',
        }}
      >
        <div
          style={{
            flexGrow: 1,
            backgroundImage: `url(${foodImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        <div
          style={{
            backgroundColor: 'lightgreen',
            padding: '12px',
          }}
        >
          <Typography
            style={{
              fontFamily: 'Roboto',
              fontWeight: 600,
              fontSize: '16px',
            }}
          >
            Salad
          </Typography>
        </div>
        <div
          style={{
            backgroundColor: 'white',
            padding: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <Avatar>{'J'}</Avatar>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography
              style={{
                fontFamily: 'Roboto',
                fontSize: '16px',
                fontWeight: 500,
                color: theme.palette.text?.primary,
              }}
            >
              {'Jane Doe'}
            </Typography>
            <Typography
              style={{
                fontFamily: 'Roboto',
                fontSize: '16px',
                fontWeight: 400,
                color: theme.palette.text?.secondary,
              }}
            >
              {'Apprentice Chef'}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
