import { List, ListItem } from '@mui/material';
import { IngredientItem } from '../../../../../utils/types/Ingredient';
import DefaultButton from '../../../../../utils/components/button/button';
import { useTranslation } from 'react-i18next';

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
      <List sx={{ overflow: 'auto' }}>
        {recipeIngredients.map((ingredient, index) => (
          <ListItem key={index}></ListItem>
        ))}
      </List>
      <DefaultButton label={t('addIngredient')} />
    </div>
  );
};

export default IngredientsPageModal;
