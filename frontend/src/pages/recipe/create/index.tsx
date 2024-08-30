import React, { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import styles from './styles';
import {
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import {
  Difficulties,
  RecipeCategories,
  RecipeInput,
} from '../../../utils/types/Recipe';
import Masonry, {
  ResponsiveMasonry,
} from 'react-responsive-masonry';
import { IngredientItem } from '../../../utils/types/Ingredient';
import IngredientsContainer from './components/ingredients-container';
import PreparationContainer from './components/preparation-container';
import DefaultSelect from '../../../utils/components/select';
import { Preparation } from '../../../utils/types/Preparation';
import { times } from 'lodash';
import ImageInput from '../../../utils/components/image-input';
import { createRecipe } from '../../../actions/recipe.actions';
import { useSelector } from 'react-redux';

const CreateRecipe: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const [recipeData, setRecipeData] = useState<{
    title: string;
    hours: undefined;
    minutes: undefined;
    category: string;
    difficulty: string;
    description: string;
    images: File[];
  }>({
    title: '',
    hours: undefined,
    minutes: undefined,
    category: '',
    difficulty: '',
    description: '',
    images: [],
  });
  const [ingredientsData, setIngredientsData] = useState<
    IngredientItem[]
  >([]);
  const [preparationData, setPreparationData] =
    useState<Preparation>({ video: '', steps: [] });
  const [searchVal, setSearchVal] = useState('');
  const userId =
    useSelector(
      (state: RootState) => state.auth.user?.id
    ) ||
    JSON.parse(localStorage.getItem('user') as string).id;

  const handleRecipeDataChange = (
    valueToChange: string,
    event?:
      | SelectChangeEvent<unknown>
      | React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement
        >,
    val?: string,
    file?: File
  ) => {
    const copyRecipeData = { ...recipeData };
    let updatedRecipeData: {
      title: string;
      hours: undefined;
      minutes: undefined;
      category: string;
      difficulty: string;
      description: string;
      images: File[];
    };

    if (file) {
      updatedRecipeData = {
        ...copyRecipeData,
        images: [...copyRecipeData.images, file],
      };
    } else {
      updatedRecipeData = {
        ...copyRecipeData,
        [valueToChange]: event ? event.target.value : val,
      };
    }

    setRecipeData(updatedRecipeData);
  };

  const { InputField, DefaultButton } = styles;

  const categories = Object.values(RecipeCategories);
  const difficulties = Object.values(Difficulties);
  const imageCards = times(
    6,
    index => recipeData.images[index] || ''
  );

  const filteredCategories = (searchVal: string = '') => {
    return categories.filter(category =>
      category
        .toLowerCase()
        .includes(searchVal.toLowerCase())
    );
  };

  const handleCreateRecipe = async (e: FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append('userId', userId?.toString() as string);
    data.append('title', recipeData.title);
    data.append(
      'duration',
      JSON.stringify({
        hours: recipeData.hours,
        minutes: recipeData.minutes,
      })
    );
    data.append('category', recipeData.category);
    data.append('difficulty', recipeData.difficulty);
    data.append('description', recipeData.description);
    recipeData.images.forEach(imageFile => {
      data.append('images', imageFile); // Append each image file to the FormData object
    });
    data.append(
      'ingredients',
      JSON.stringify(ingredientsData)
    );
    data.append(
      'preparation',
      JSON.stringify(preparationData)
    );
    await dispatch(createRecipe(data));
  };

  return (
    <form
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
      onSubmit={e => handleCreateRecipe(e)}
    >
      <InputField
        placeholder={'Title'}
        style={{ minWidth: '240px' }}
        value={recipeData.title}
        onChange={e => handleRecipeDataChange('title', e)}
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
          options={filteredCategories(searchVal)}
          onChange={(val, valToChange) =>
            valToChange === 'value'
              ? handleRecipeDataChange(
                  'category',
                  undefined,
                  val as string
                )
              : setSearchVal(val as string)
          }
          label={'Choose a category'}
          minWidth={170}
          search
        />
        <DefaultSelect<string>
          value={recipeData.difficulty}
          options={difficulties}
          onChange={val =>
            handleRecipeDataChange(
              'difficulty',
              undefined,
              val as string
            )
          }
          label={'Choose a difficulty'}
          minWidth={170}
        />
      </div>
      <InputField
        placeholder={'Description'}
        type={'text'}
        multiline
        height={'100px'}
        minWidth={'1200px'}
        value={recipeData.description}
        onChange={e =>
          handleRecipeDataChange('description', e)
        }
      />
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
          {imageCards.map((_stepImage, index) => (
            <ImageInput
              key={index}
              onImageChanged={file =>
                handleRecipeDataChange(
                  'images',
                  undefined,
                  undefined,
                  file
                )
              }
              onDeleteImage={fileName =>
                setRecipeData({
                  ...recipeData,
                  images: recipeData.images.filter(
                    img => img.name !== fileName
                  ),
                })
              }
            />
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
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          alignSelf: 'flex-end',
          gap: '8px',
        }}
      >
        <DefaultButton
          onClick={() => {
            setRecipeData({
              title: '',
              hours: undefined,
              minutes: undefined,
              category: '',
              difficulty: '',
              description: '',
              images: [],
            });
            setIngredientsData([]);
            setPreparationData({ video: '', steps: [] });
          }}
          variant={'outlined'}
        >
          {'Cancel'}
        </DefaultButton>
        <DefaultButton type={'submit'}>
          {'Save'}
        </DefaultButton>
      </div>
    </form>
  );
};

export default CreateRecipe;
