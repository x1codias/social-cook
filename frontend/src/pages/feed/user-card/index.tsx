import {
  Avatar,
  Divider,
  Skeleton,
  Typography,
} from '@mui/material';
import React from 'react';
import theme from '../../../themes/global.theme';
import { Account } from '../../../utils/types/Account';
import { useTranslation } from 'react-i18next';
import DefaultButton from '../../../utils/components/button/button';
import styles from './styles';
import { ArrowForward } from '@mui/icons-material';

type UserCardProps = {
  loading?: boolean;
  userData: Account;
};

const UserCard: React.FC<UserCardProps> = (
  props
): JSX.Element => {
  const { loading, userData } = props;
  const { t } = useTranslation();
  const { RecipeImage } = styles;

  const recipeGrid = () => {
    const totalRecipes = userData.recipes.total;

    // Grid configuration based on the number of recipes
    if (totalRecipes <= 2) {
      return { rows: 1, cols: totalRecipes }; // 1 row, 1 or 2 columns
    } else {
      return { rows: 2, cols: 2 }; // 2 rows, 2 columns
    }
  };

  return loading ? (
    <Skeleton
      variant="rectangular"
      height={'fit-content'}
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
    <div
      style={{
        height: 'fit-content', // Random height
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        overflow: 'hidden',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: `repeat(${
            recipeGrid().cols
          }, 1fr)`, // Set number of columns dynamically
          gridAutoRows: 'min-content', // Auto-adjust row height
          gap: '8px', // Space between items
          padding: '8px',
          backgroundColor: theme.palette.default.light, // Adjust to your theme
        }}
      >
        {userData.recipes.data.length ? (
          userData.recipes.data.map((recipe, index) => {
            const photoUrl = recipe.photos?.[0];

            // Check if we are at the fourth item in the grid and there are more recipes to display
            if (
              index === 3 &&
              userData.recipes.data.length > 4
            ) {
              return (
                <div
                  key="remaining-recipes"
                  style={{
                    gridColumn: `span 1`,
                    height: `300px`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor:
                      theme.palette.default.primary,
                    borderRadius: '8px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                  }}
                >
                  <Typography
                    style={{
                      fontFamily: 'Comfortaa',
                      fontSize: '40px',
                      fontWeight: 700,
                      textAlign: 'center',
                    }}
                  >
                    +{userData.recipes.total - 3}{' '}
                  </Typography>
                </div>
              );
            }

            // Determine column span for the last row based on how many items are left
            const isLastRow =
              index >=
              userData.recipes.data.length -
                (userData.recipes.data.length %
                  recipeGrid().cols);

            let columnSpan = 1;
            if (isLastRow) {
              const remainingItems =
                userData.recipes.data.length %
                recipeGrid().cols;
              if (remainingItems === 1) {
                columnSpan = recipeGrid().cols; // Span all columns when only 1 item remains
              } else if (remainingItems === 2) {
                columnSpan = 1; // 2 items in the last row, each takes 1 column
              }
            }

            // For all other items, render the usual recipe card
            if (index >= 4) return null; // Skip items after the fourth
            return (
              <RecipeImage
                key={index}
                columnSpan={columnSpan}
                recipeImage={photoUrl}
              >
                {!photoUrl && (
                  <Typography
                    style={{
                      height: '100%',
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {t('noImages')}
                  </Typography>
                )}
              </RecipeImage>
            );
          })
        ) : (
          <Typography
            fontFamily={'Comfortaa'}
            fontSize={18}
            fontWeight={700}
            textAlign={'center'}
            padding={10}
          >
            {t('noRecipesYet')}
          </Typography>
        )}
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          padding: '12px',
          gap: '12px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            padding: '6px',
            alignSelf: 'center',
          }}
        >
          <Avatar
            sx={{ width: '54px', height: '54px' }}
            src={userData.photo}
          ></Avatar>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '2px',
              }}
            >
              <Typography
                fontFamily={'Comfortaa'}
                fontSize={16}
              >
                {userData.followersCount}
              </Typography>
              <Typography
                fontFamily={'Comfortaa'}
                fontSize={14}
                fontWeight={600}
              >
                {t('followers')}
              </Typography>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '2px',
              }}
            >
              <Typography
                fontFamily={'Comfortaa'}
                fontSize={16}
              >
                {userData.followingCount}
              </Typography>
              <Typography
                fontFamily={'Comfortaa'}
                fontSize={14}
                fontWeight={600}
              >
                {t('following')}
              </Typography>
            </div>
          </div>
        </div>
        <Divider
          orientation={'vertical'}
          sx={{ borderRadius: '10px', borderWidth: '2px' }}
        />
        <div
          style={{
            padding: '6px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            flexGrow: 1,
            alignItems: 'flex-start',
          }}
        >
          <Typography
            fontFamily={'Fredoka'}
            fontSize={20}
            fontWeight={700}
            color={theme.palette.default.dark}
          >
            {userData.username}
          </Typography>
          <Typography
            fontFamily={'Comfortaa'}
            fontSize={14}
          >
            {userData.biography
              ? userData.biography
              : `(${t('emptyBiography')})`}
          </Typography>
        </div>
      </div>
      <div
        style={{ padding: '8px', alignSelf: 'flex-end' }}
      >
        <DefaultButton
          label={
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Typography fontSize={16}>
                {t('viewProfile')}
              </Typography>
              <ArrowForward fontSize={'large'} />
            </div>
          }
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

export default UserCard;
