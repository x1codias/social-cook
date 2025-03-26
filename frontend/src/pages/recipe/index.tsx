import {
  Avatar,
  Chip,
  Divider,
  Rating,
  Typography,
} from '@mui/material';
import theme from '../../themes/global.theme';
import { useTranslation } from 'react-i18next';
import { LuChefHat } from 'react-icons/lu';
import {
  AccessTimeRounded,
  LocalDiningRounded,
  PeopleRounded,
  StarRounded,
} from '@mui/icons-material';
import { useCallback, useEffect, useState } from 'react';
import { Recipe } from '../../utils/types/Recipe';
import { useLocation } from 'react-router';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import {
  getRecipe,
  rateRecipe,
} from '../../actions/recipe.actions';
import moment from 'moment';
import RecipePreparation from './preparation';
import RecipeIngredients from './ingredients';
import ImageContainer from './image-container';

const RecipePage: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const [recipe, setRecipe] = useState<Recipe>(null);
  const [recipeRating, setRecipeRating] = useState(0);
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  /* const [
    ingredientsPreparation,
    setIngredientsPreparation,
  ] = useState('ingredients'); */

  const getRecipeData = useCallback(async () => {
    const recipeData = await dispatch(
      getRecipe(location.pathname.split('/')[2])
    );
    setRecipe(recipeData.recipe);
    setRecipeRating(recipeData.recipe.userRating);
  }, [dispatch, location]);

  useEffect(() => {
    getRecipeData();
  }, [getRecipeData]);

  const onRatingChange = async (
    newValue: number | null
  ) => {
    if (newValue && recipe.id) {
      setRecipeRating(newValue);
      await dispatch(rateRecipe(recipe.id, newValue));
    }
  };

  return recipe ? (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh', // Ensure the container takes the full viewport height
        width: '100%',
        alignItems: 'flex-start',
        padding: '64px 20px',
        gap: '18px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          width: '100%',
        }}
      >
        <Typography
          letterSpacing={2}
          style={{
            fontFamily: 'Fredoka',
            fontSize: '32px',
            fontWeight: 600,
            color: theme.palette.default.dark,
            borderBottom: `2px solid ${theme.palette.grey?.[400]}`,
          }}
        >
          {recipe?.title}
        </Typography>
        <Chip
          label={t(recipe?.category)}
          sx={{
            fontFamily: 'Comfortaa',
            fontSize: '18px',
            fontWeight: 600,
            backgroundColor:
              theme.palette.categories[recipe?.category],
          }}
        />
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '18px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <Avatar src={recipe.user.photo}>
              {recipe.user.username}
            </Avatar>
            <Typography
              style={{
                fontFamily: 'Fredoka',
                fontSize: '22px',
                fontWeight: 500,
                color: theme.palette.text?.primary,
              }}
            >
              {recipe.user.username}
            </Typography>
          </div>
          <Typography
            style={{
              fontFamily: 'Comfortaa',
              fontSize: '16px',
              fontWeight: 500,
              color: theme.palette.text?.secondary,
              textAlign: 'center',
            }}
          >
            {'(' +
              t('postedOn') +
              ' ' +
              moment(recipe.createdAt).format(
                'DD/MM/YYYY'
              ) +
              ' ' +
              t('at') +
              ' ' +
              moment(recipe.createdAt).format('hh:mm') +
              ')'}
          </Typography>
        </div>
        {recipe.avgRating && (
          <Rating
            defaultValue={recipe.avgRating}
            readOnly
            size={'large'}
            emptyIcon={
              <StarRounded
                sx={{
                  color: theme.palette.grey?.[400],
                  fontSize: '28px',
                }}
              />
            }
            icon={
              <StarRounded
                fontSize={'large'}
                sx={{
                  color: theme.palette.warning,
                  fontSize: '28px',
                }}
              />
            }
          />
        )}
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px',
        }}
      >
        <LocalDiningRounded sx={{ fontSize: '28px' }} />
        <Typography
          variant="h6"
          fontFamily={'Comfortaa'}
          fontSize={18}
          fontStyle={'italic'}
        >
          <span
            style={{
              fontSize: '28px',
              color: theme.palette.default.dark,
            }}
          >
            &#8220;
          </span>{' '}
          {recipe?.description}
          <span
            style={{
              fontSize: '28px',
              color: theme.palette.default.dark,
            }}
          >
            &#8221;
          </span>
        </Typography>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between', // changed to space-between
          gap: '16px',
          width: '100%',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <AccessTimeRounded sx={{ fontSize: '28px' }} />
          <Typography
            style={{
              fontFamily: 'Fredoka',
              fontSize: '18px',
              padding: '2px 12px',
              backgroundColor:
                theme.palette.background?.paper,
              borderRadius: '20px',
              border: `1px solid ${theme.palette.default.dark}`,
            }}
          >
            {`${recipe?.duration.hours} `}
            <span>{'H'}</span>
            {` : ${recipe?.duration.minutes} `}
            <span>{'M'}</span>
          </Typography>
        </div>
        <Divider
          style={{
            borderColor: theme.palette.default.dark,
            borderWidth: '1.5px',
            borderRadius: '20px',
          }}
          orientation={'vertical'}
        />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <PeopleRounded sx={{ fontSize: '28px' }} />
          <Typography
            style={{
              fontFamily: 'Fredoka',
              fontSize: '18px',
              padding: '2px 12px',
              backgroundColor:
                theme.palette.background?.paper,
              borderRadius: '20px',
              border: `1px solid ${theme.palette.default.dark}`,
            }}
          >
            {recipe?.servings + ' ' + t('servings')}
          </Typography>
        </div>
        <Divider
          style={{
            borderColor: theme.palette.default.dark,
            borderWidth: '1.5px',
            borderRadius: '20px',
          }}
          orientation={'vertical'}
        />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <LuChefHat fontSize={'28px'} />
          <Typography
            style={{
              fontFamily: 'Fredoka',
              fontSize: '18px',
              padding: '2px 12px',
              color: theme.palette.customText.button,
              backgroundColor:
                theme.palette.difficulty[
                  recipe?.difficulty
                ],
              borderRadius: '20px',
            }}
          >
            {t(recipe?.difficulty)}
          </Typography>
        </div>
        <div
          style={{
            marginLeft: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: '18px',
          }}
        >
          <Typography
            fontSize={18}
            fontFamily={'Comfortaa'}
          >
            {t('rateRecipe')}
          </Typography>
          <Rating
            defaultValue={recipeRating}
            size={'large'}
            onChange={(e, value) => onRatingChange(value)}
            sx={{
              backgroundColor: theme.palette.grey?.[300],
              padding: '4px 12px',
              borderRadius: '20px',
            }}
            emptyIcon={
              <StarRounded
                sx={{
                  color: theme.palette.background?.paper,
                  fontSize: '28px',
                }}
              />
            }
            icon={
              <StarRounded
                sx={{
                  color: theme.palette.warning,
                  fontSize: '28px',
                }}
              />
            }
          />
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          gap: '32px',
          flexGrow: 1,
          width: '100%',
          maxHeight: '900px',
        }}
      >
        <ImageContainer recipe={recipe} />
        <RecipeIngredients
          ingredients={recipe.ingredients}
        />
        <RecipePreparation prepData={recipe.preparation} />
        {/* <div
          style={{
            flexGrow: 1,
            backgroundColor:
              theme.palette.customBackground.input,
            padding: '8px',
            borderRadius: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '16px',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {['ingredients', 'preparation'].map(label => (
              <DefaultButton
                key={label}
                customStyles={{
                  '&.Mui-disabled': {
                    backgroundColor:
                      theme.palette.default.primary,
                    color: theme.palette.customText.button,
                    border: `1px solid ${theme.palette.default.primary}`,
                  },
                }}
                disabled={ingredientsPreparation === label}
                variant={'outlined'}
                label={t(label)}
                icon={
                  label === 'preparation' ? (
                    <SoupKitchenRounded
                      fontSize={'large'}
                    />
                  ) : (
                    <ShoppingCartRounded
                      fontSize={'large'}
                    />
                  )
                }
                onClick={() => {
                  setIngredientsPreparation(label);
                }}
              />
            ))}
          </div>
          {ingredientsPreparation === 'preparation' ? (
            <RecipePreparation
              prepData={recipe.preparation}
            />
          ) : (
            <RecipeIngredients
              ingredients={recipe.ingredients}
            />
          )}
        </div> */}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default RecipePage;
