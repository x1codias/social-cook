import { useTranslation } from 'react-i18next';
import { RecipeIngredient } from '../../../utils/types/Ingredient';
import { List, ListItem, Typography } from '@mui/material';
import {
  FaSpoon,
  FaDroplet,
  FaPlus,
} from 'react-icons/fa6';
import { MdScale } from 'react-icons/md';
import { BsCupFill } from 'react-icons/bs';
import { IoSparkles } from 'react-icons/io5';
import theme from '../../../themes/global.theme';

type RecipeIngredientsProps = {
  ingredients: RecipeIngredient[];
};

const RecipeIngredients: React.FC<
  RecipeIngredientsProps
> = ({ ingredients }): JSX.Element => {
  const { t } = useTranslation();

  const ingredientIcon = (unit: string) => {
    switch (true) {
      case unit.includes('spoon'):
        return (
          <FaSpoon
            fontSize={28}
            color={theme.palette.customText.button}
          />
        );
      case unit.includes('gram'):
        return (
          <MdScale
            fontSize={28}
            color={theme.palette.customText.button}
          />
        );
      case unit.includes('litre'):
        return (
          <FaDroplet
            fontSize={28}
            color={theme.palette.customText.button}
          />
        );
      case unit.includes('cup'):
        return (
          <BsCupFill
            fontSize={28}
            color={theme.palette.customText.button}
          />
        );
      case unit.includes('pinch'):
        return (
          <IoSparkles
            fontSize={28}
            color={theme.palette.customText.button}
          />
        );
      default:
        return (
          <FaPlus
            fontSize={28}
            color={theme.palette.customText.button}
          />
        );
    }
  };

  return (
    <div
      style={{
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          padding: '12px',
          backgroundColor:
            theme.palette.background?.default,
          borderRadius: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        {ingredients.map((ingredient, index) => (
          <ListItem
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '12px',
              backgroundColor:
                theme.palette.default.primary,
              borderRadius: '50px',
            }}
          >
            {ingredientIcon(
              ingredient.unit.name.toLowerCase()
            )}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <Typography
                fontFamily={'Fredoka'}
                fontSize={20}
                fontWeight={600}
                color={theme.palette.customText.button}
              >
                {ingredient.quantity}
              </Typography>
              <Typography
                fontFamily={'Fredoka'}
                fontSize={20}
                fontWeight={600}
                color={theme.palette.customText.button}
              >
                {ingredient.unit.symbol}
              </Typography>
              <Typography
                fontFamily={'Fredoka'}
                fontSize={20}
                color={theme.palette.customText.button}
              >
                {ingredient.ingredient.name}
              </Typography>
            </div>
          </ListItem>
        ))}
      </div>
    </div>
  );
};

export default RecipeIngredients;
