import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import styles from './styles';
import {
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import {
  Difficulties,
  RecipeCategories,
} from '../../../utils/types/Recipe';
import Masonry, {
  ResponsiveMasonry,
} from 'react-responsive-masonry';
import foodImage from '../../../assets/e77ef6d4207c6da257384b67b10efc67.jpeg';
import { IngredientItem } from '../../../utils/types/Ingredient';
import IngredientsContainer from './components/ingredients-container';
import PreparationContainer from './components/preparation-container';
import DefaultSelect from '../../../utils/components/select';

const CreateRecipe: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const [recipeData, setRecipeData] = React.useState({
    title: '',
    hours: undefined,
    minutes: undefined,
    category: '',
    difficulty: '',
    description: '',
    images: [],
  });
  const [ingredientsData, setIngredientsData] =
    React.useState<IngredientItem[]>([]);
  const [preparationData, setPreparationData] =
    React.useState(null);

  const handleRecipeDataChange = (
    valueToChange: string,
    event?:
      | SelectChangeEvent<unknown>
      | React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement
        >,
    val?: string
  ) => {
    const copyRecipeData = { ...recipeData };
    const updatedRecipeData = {
      ...copyRecipeData,
      [valueToChange]: event ? event.target.value : val,
    };
    setRecipeData(updatedRecipeData);
  };

  const { InputField, SelectField } = styles;

  const categories = Object.values(RecipeCategories);
  const difficulties = Object.values(Difficulties);
  const imageCards = [...Array(6)].map(() => ({
    url: 'url',
  }));

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flexGrow: 1,
        paddingTop: '74px',
        paddingBottom: '20px',
        gap: '16px',
        paddingLeft: '20px',
        paddingRight: '20px',
      }}
    >
      <InputField
        placeholder={'Title'}
        style={{ minWidth: '240px' }}
        value={recipeData.title}
        onChange={e => handleRecipeDataChange(e, 'title')}
      />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '24px',
          width: '100%',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            width: 'fit-content',
          }}
        >
          <InputField
            placeholder={'Hours'}
            type={'number'}
            style={{ minWidth: '80px' }}
            InputProps={{ inputProps: { min: 0, max: 99 } }}
            value={recipeData.hours}
            onChange={e =>
              handleRecipeDataChange('hours', e)
            }
          />
          <Typography fontSize={16}>{'H'}</Typography>
          <InputField
            placeholder={'Minutes'}
            type={'number'}
            style={{ minWidth: '100px' }}
            InputProps={{ inputProps: { min: 0, max: 60 } }}
            value={recipeData.minutes}
            onChange={e =>
              handleRecipeDataChange('minutes', e)
            }
          />
          <Typography fontSize={16}>{'M'}</Typography>
        </div>
        <DefaultSelect<string>
          value={recipeData.category}
          options={categories}
          onChange={val =>
            handleRecipeDataChange(
              'category',
              undefined,
              val
            )
          }
          label={'Choose a category'}
          minWidth={170}
        />
        <DefaultSelect<string>
          value={recipeData.difficulty}
          options={difficulties}
          onChange={val =>
            handleRecipeDataChange(
              'difficulty',
              undefined,
              val
            )
          }
          label={'Choose a difficulty'}
          minWidth={170}
        />
      </div>
      <ResponsiveMasonry
        style={{
          width: '100%',
        }}
        columnsCountBreakPoints={{
          200: 1,
          600: 2,
          1000: 3,
          1600: 6,
        }}
      >
        <Masonry gutter="14px">
          {imageCards.map((imageCard, index) => (
            <div
              key={index}
              style={{
                flexGrow: 1,
                width: '100%',
                height: '370px',
                backgroundImage: `url(${foodImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              }}
            ></div>
          ))}
        </Masonry>
      </ResponsiveMasonry>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          gap: '16px',
        }}
      >
        <IngredientsContainer
          ingredientsData={ingredientsData}
          setIngredientsData={setIngredientsData}
        />
        <PreparationContainer
          preparationData={preparationData}
          setPreparationData={setPreparationData}
        />
      </div>
    </div>
  );
};

export default CreateRecipe;
