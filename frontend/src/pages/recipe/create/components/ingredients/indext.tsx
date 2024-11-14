import {
  Avatar,
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
import { useCallback, useEffect } from 'react';

type IngredientsPageModalProps = {
  recipeIngredients: IngredientItem[];
  setRecipeIngredients: (
    ingredients: IngredientItem[]
  ) => void;
  setCanProceed: (val: boolean) => void;
};

const IngredientsPageModal: React.FC<
  IngredientsPageModalProps
> = (props): JSX.Element => {
  const {
    recipeIngredients,
    setRecipeIngredients,
    setCanProceed,
  } = props;
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

  const validateFields = useCallback(() => {
    const hasIngredients = recipeIngredients.length > 0;

    const validIngredientFields = recipeIngredients.some(
      ingredient =>
        (ingredient.name as number) > 0 &&
        ingredient.quantity > 0 &&
        (ingredient.name as number) > 0
    );

    return hasIngredients && validIngredientFields;
  }, [recipeIngredients]);

  useEffect(() => {
    setCanProceed(validateFields());
  }, [validateFields, setCanProceed]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '14px',
      }}
    >
      <div
        style={{
          backgroundColor:
            theme.palette.customBackground.default,
          padding: '8px',
          borderRadius: '10px',
          width: '100%',
          maxHeight: '395px',
          overflow: 'auto',
        }}
      >
        {recipeIngredients.length > 0 ? (
          <List
            sx={{
              overflow: 'auto',
              width: '100%', // full width
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center', // center ListItems within List
              gap: '12px',
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
                <Avatar
                  sx={{
                    backgroundColor:
                      theme.palette.default.primary,
                    padding: '4px 14px',
                    borderRadius: '50%',
                    fontSize: '20px',
                    fontFamily: 'Comfortaa',
                  }}
                >
                  {index + 1}
                </Avatar>
                <DefaultSelect
                  options={
                    ingredientsScrollData.ingredients
                  }
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
                        color:
                          theme.palette.customError.main,
                        fontSize: '26px',
                      },
                    }}
                  />
                </IconButton>
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography
            sx={{
              fontSize: '16px',
              fontFamily: 'Comfortaa',
              fontWeight: 700,
              textAlign: 'center',
              color: theme.palette.customText.secondary,
            }}
          >
            {t('noIngredientsAdded')}
          </Typography>
        )}
      </div>
      <DefaultButton
        label={'+ ' + t('addIngredient')}
        onClick={handleAddNewIngredient}
      />
    </div>
  );
};

export default IngredientsPageModal;
