import {
  IconButton,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import { IngredientItem } from '../../../../../utils/types/Ingredient';
import DefaultButton from '../../../../../utils/components/button/button';
import { useTranslation } from 'react-i18next';
import theme from '../../../../../themes/global.theme';
import DefaultSelect from '../../../../../utils/components/select';
import { useSelector } from 'react-redux';
import { getIngredients } from '../../../../../actions/ingredient.actions';
import DefaultInput from '../../../../../utils/components/input/input';
import useFetchData from '../../../../../utils/hooks/useFetchData';
import { getUnits } from '../../../../../actions/unit.actions';
import { DeleteRounded } from '@mui/icons-material';

type IngredientsPageModalProps = {
  recipeIngredients: IngredientItem[];
  setRecipeIngredients: (
    ingredients: IngredientItem[]
  ) => void;
};

const IngredientsPageModal: React.FC<
  IngredientsPageModalProps
> = (props): JSX.Element => {
  const { recipeIngredients, setRecipeIngredients } = props;
  const { t } = useTranslation();
  const ingredientsScrollData = useSelector(
    (state: { ingredient: { scrollData: any } }) =>
      state.ingredient.scrollData
  );
  const unitsScrollData = useSelector(
    (state: { unit: { scrollData: any } }) =>
      state.unit.scrollData
  );

  useFetchData(getIngredients, ingredientsScrollData);
  useFetchData(getUnits, unitsScrollData);

  const handleAddNewIngredient = () => {
    const newIngredient: IngredientItem = {
      name: '',
      quantity: 0,
      unit: '',
    };

    setRecipeIngredients([
      ...recipeIngredients,
      newIngredient,
    ]);
  };

  const removeIngredient = (ingredientIndex: number) => {
    const updatedIngredients = recipeIngredients.filter(
      (_, index) => ingredientIndex !== index
    );

    setRecipeIngredients(updatedIngredients);
  };

  const handleChangeIngredient = (
    ingredientIndex: number,
    fieldToChange: 'name' | 'quantity' | 'unit',
    value: string
  ) => {
    const updatedIngredients = recipeIngredients.map(
      (ingredient, index) =>
        ingredientIndex === index
          ? {
              ...ingredient,
              [fieldToChange]:
                fieldToChange === 'quantity'
                  ? parseInt(value)
                  : value,
            }
          : ingredient
    );

    setRecipeIngredients(updatedIngredients);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '14px',
        overflow: 'hidden',
      }}
    >
      <List
        sx={{
          overflow: 'auto',
          width: '100%', // full width
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', // center ListItems within List
        }}
      >
        {recipeIngredients.map((ingredient, index) => (
          <ListItem
            key={index}
            sx={{
              gap: '12px',
              padding: 0,
              alignSelf: 'center',
            }}
          >
            <Typography
              fontSize={20}
              fontFamily={'Comfortaa'}
              color={theme.palette.background?.default}
              sx={{
                backgroundColor:
                  theme.palette.default.primary,
                padding: '4px 14px',
                borderRadius: '50%',
              }}
            >
              {index + 1}
            </Typography>
            <DefaultSelect
              options={ingredientsScrollData.ingredients}
              value={ingredient.name}
              placeholder={t('selectIngredient')}
              onChange={val =>
                handleChangeIngredient(
                  index,
                  'name',
                  val as string
                )
              }
            />
            <DefaultInput
              type={'number'}
              placeholder={t('quantity')}
              value={ingredient.quantity}
              onChange={e =>
                handleChangeIngredient(
                  index,
                  'quantity',
                  e.target.value
                )
              }
              min={0}
            />
            <DefaultSelect
              options={unitsScrollData.units}
              value={ingredient.unit}
              placeholder={t('selectUnit')}
              onChange={val =>
                handleChangeIngredient(
                  index,
                  'unit',
                  val as string
                )
              }
            />
            <IconButton
              onClick={() => removeIngredient(index)}
            >
              <DeleteRounded
                sx={{
                  '&.MuiSvgIcon-root': {
                    color: theme.palette.customError.main,
                    fontSize: '26px',
                  },
                }}
              />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <DefaultButton
        label={'+ ' + t('addIngredient')}
        onClick={handleAddNewIngredient}
      />
    </div>
  );
};

export default IngredientsPageModal;
