import {
  Avatar,
  Skeleton,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import theme from '../../../themes/global.theme';
import styles from './styles';
import DefaultButton from '../../../utils/components/button/button';
import FoodCardExpanded from '../food-card-expanded';
import { Recipe } from '../../../utils/types/Recipe';

type FoodCardProps = {
  height: number;
  loading?: boolean;
  recipeData: Recipe;
};

const FoodCard: React.FC<FoodCardProps> = (
  props
): JSX.Element => {
  const { height, loading, recipeData } = props;
  const { RecipeImage } = styles;
  const [openRecipeDialog, setOpenRecipeDialog] =
    useState(false);

  return loading ? (
    <Skeleton
      variant="rectangular"
      height={height}
      style={{
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    />
  ) : (
    <>
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
          <RecipeImage
            foodImage={
              recipeData.photos ? recipeData.photos[0] : ''
            }
          />
          <div
            style={{
              backgroundColor:
                theme.palette.categories[
                  recipeData.category
                ],
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
              {recipeData.title}
            </Typography>
          </div>
          <div
            style={{
              backgroundColor: 'white',
              padding: '12px',
              display: 'grid',
              gridTemplateColumns: 'auto auto 1fr',
              alignItems: 'center',
              justifyContent: 'flex-start',
              width: '100%',
              gap: '8px',
            }}
          >
            <Avatar src={recipeData.User.photo}>
              {recipeData.User.username}
            </Avatar>
            <Typography
              style={{
                fontFamily: 'Roboto',
                fontSize: '16px',
                fontWeight: 500,
                color: theme.palette.text?.primary,
              }}
            >
              {recipeData.User.username}
            </Typography>
            <DefaultButton
              label={'More details'}
              customStyles={{
                justifySelf: 'flex-end',
              }}
              onClick={() => setOpenRecipeDialog(true)}
            />
          </div>
        </div>
      </div>
      <FoodCardExpanded
        recipeId={openRecipeDialog}
        onClose={() => setOpenRecipeDialog(false)}
        recipeData={recipeData}
      />
    </>
  );
};

export default FoodCard;
