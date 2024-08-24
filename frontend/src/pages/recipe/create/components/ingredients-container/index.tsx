import { Typography } from '@mui/material';
import theme from '../../../../../themes/global.theme';
import { IngredientItem } from '../../../../../utils/types/Ingredient';
import { Add } from '@mui/icons-material';
import styles from './styles';
import IngredientsItem from '../ingredient-item';

type IngredientsContainerProps = {
  ingredientsData: IngredientItem[];
  setIngredientsData: (
    ingredients: IngredientItem[]
  ) => void;
};

const IngredientsContainer: React.FC<
  IngredientsContainerProps
> = (props): JSX.Element => {
  const { ingredientsData, setIngredientsData } = props;
  const { DefaultButton } = styles;

  const handleAddIngredient = () => {
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
      {ingredientsData.map((ingredient, index) => (
        <IngredientsItem
          ingredient={ingredient}
          ingIndex={index}
          ingredientsData={ingredientsData}
          setIngredientsData={setIngredientsData}
        />
      ))}
      <DefaultButton
        variant={'contained'}
        onClick={handleAddIngredient}
      >
        <Add fontSize={'large'} />
        <Typography
          style={{
            fontFamily: 'Fredoka',
            fontSize: '16px',
            textAlign: 'center',
          }}
        >
          {'Add Ingredient'}
        </Typography>
      </DefaultButton>
    </div>
  );
};

export default IngredientsContainer;
