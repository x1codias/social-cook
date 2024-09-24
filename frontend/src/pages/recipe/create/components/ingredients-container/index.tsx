import { Typography } from '@mui/material';
import theme from '../../../../../themes/global.theme';
import { IngredientItem } from '../../../../../utils/types/Ingredient';
import { Add } from '@mui/icons-material';
import IngredientsItem from '../ingredient-item';
import DefaultButton from '../../../../../utils/components/button/button';

type IngredientsContainerProps = {
  editCreate?: boolean;
  ingredientsData?: IngredientItem[];
  setIngredientsData?: (
    ingredients: IngredientItem[]
  ) => void;
};

const IngredientsContainer: React.FC<
  IngredientsContainerProps
> = (props): JSX.Element => {
  const {
    editCreate,
    ingredientsData,
    setIngredientsData,
  } = props;

  const handleAddIngredient = () => {
    if (ingredientsData && setIngredientsData) {
      const ingredientsDataCopy = [...ingredientsData];
      const updatedIngredientsData = [
        ...ingredientsDataCopy,
        {
          name: '',
          quantity: undefined,
          unit: '',
        },
      ];
      setIngredientsData(updatedIngredientsData);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        borderRadius: '8px',
        backgroundColor: theme.palette.background?.default,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        gap: '16px',
        minWidth: '570px',
        alignItems: 'flex-start',
      }}
    >
      <Typography
        style={{
          width: 'fit-content',
          fontFamily: 'Fredoka',
          fontSize: '28px',
          fontWeight: 600,
          color: theme.palette.default.dark,
          borderBottom: `2px solid ${theme.palette.grey?.[400]}`,
        }}
      >
        {'Ingredients'}
      </Typography>
      {editCreate &&
      ingredientsData &&
      setIngredientsData ? (
        ingredientsData.map((ingredient, index) => (
          <IngredientsItem
            key={index}
            ingredient={ingredient}
            ingIndex={index}
            ingredientsData={ingredientsData}
            setIngredientsData={setIngredientsData}
          />
        ))
      ) : (
        <></>
      )}
      {editCreate && (
        <DefaultButton
          variant={'contained'}
          onClick={handleAddIngredient}
          icon={<Add fontSize={'large'} />}
          label={'Add Ingredient'}
        />
      )}
    </div>
  );
};

export default IngredientsContainer;
