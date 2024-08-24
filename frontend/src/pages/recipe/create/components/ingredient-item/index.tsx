import theme from '../../../../../themes/global.theme';
import {
  Ingredient,
  IngredientItem,
} from '../../../../../utils/types/Ingredient';
import { Delete } from '@mui/icons-material';
import styles from './styles';
import { useSelector } from 'react-redux';
import { AppDispatch } from '../../../../../store';
import { useDispatch } from 'react-redux';
import { getIngredients } from '../../../../../actions/ingredient.actions';
import { getUnits } from '../../../../../actions/unit.actions';
import { useCallback, useEffect, useState } from 'react';
import DefaultSelect from '../../../../../utils/components/select';
import { Unit } from '../../../../../utils/types/Unit';
import {
  selectIngredientScrollData,
  selectUnitScrollData,
} from '../../../../../utils/memoized-selectors';

type IngredientsItemProps = {
  ingredientsData: IngredientItem[];
  setIngredientsData: (
    ingredients: IngredientItem[]
  ) => void;
  ingredient: IngredientItem;
  ingIndex: number;
};

const IngredientsItem: React.FC<IngredientsItemProps> = (
  props
): JSX.Element => {
  const [selectOpened, setSelectOpened] = useState<
    'ingredient' | 'unit' | ''
  >('');
  const dispatch = useDispatch<AppDispatch>();
  const {
    ingredientsData,
    ingredient,
    ingIndex,
    setIngredientsData,
  } = props;
  const { InputField } = styles;
  const unitScrollData = useSelector(selectUnitScrollData);
  const ingredientScrollData = useSelector(
    selectIngredientScrollData
  );

  const handleDeleteIngredient = () => {
    const ingredientsDataCopy = [...ingredientsData];
    const updatedIngredientsData =
      ingredientsDataCopy.filter(
        (_ingredient, index) => index !== ingIndex
      );
    setIngredientsData(updatedIngredientsData);
  };

  const getIngredientsData = useCallback(async () => {
    await dispatch(
      getIngredients(
        ingredientScrollData.limit,
        ingredientScrollData.offset
      )
    );
  }, [
    dispatch,
    ingredientScrollData.limit,
    ingredientScrollData.offset,
  ]);

  const getUnitsData = useCallback(async () => {
    await dispatch(
      getUnits(unitScrollData.limit, unitScrollData.offset)
    );
  }, [
    dispatch,
    unitScrollData.limit,
    unitScrollData.offset,
  ]);

  useEffect(() => {
    if (
      selectOpened === 'ingredient' &&
      (!ingredientScrollData.hasMore ||
        !ingredientScrollData.ingredients.length)
    ) {
      getIngredientsData();
    } else if (
      selectOpened === 'unit' &&
      (!unitScrollData.hasMore ||
        !unitScrollData.units.length)
    ) {
      getUnitsData();
    }
  }, [
    selectOpened,
    unitScrollData.hasMore,
    unitScrollData.units.length,
    ingredientScrollData.hasMore,
    ingredientScrollData.ingredients.length,
    getIngredientsData,
    getUnitsData,
  ]);

  const handleOnDataChange = (
    value: string,
    valueToChange: string
  ) => {
    const ingredientsDataCopy = [...ingredientsData];
    ingredientsDataCopy[ingIndex] = {
      ...ingredientsDataCopy[ingIndex],
      [valueToChange]: parseInt(value),
    };
    setIngredientsData(ingredientsDataCopy);
  };

  return (
    <div
      key={ingredient.name}
      style={{ display: 'flex', gap: '8px' }}
    >
      <DefaultSelect<Ingredient>
        value={ingredient.name}
        options={ingredientScrollData.ingredients}
        onChange={val =>
          handleOnDataChange(val, 'ingredient')
        }
        label={'Choose an ingredient'}
        minWidth={170}
        onOpen={() => setSelectOpened('ingredient')}
        onClose={() => setSelectOpened('')}
      />
      <InputField
        placeholder={'Quantity'}
        type={'number'}
        InputProps={{
          inputProps: { min: 1 },
        }}
        maxWidth={110}
        value={ingredient.quantity}
      />
      <DefaultSelect<Unit>
        value={ingredient.unit}
        options={unitScrollData.units}
        onChange={val => handleOnDataChange(val, 'unit')}
        label={'Choose an unit'}
        minWidth={170}
        onOpen={() => setSelectOpened('unit')}
        onClose={() => setSelectOpened('')}
      />
      <Delete
        style={{
          fill: theme.palette.error?.main,
          alignSelf: 'center',
          cursor: 'pointer',
          fontSize: '24px',
        }}
        fontSize={'large'}
        onClick={() => handleDeleteIngredient()}
      />
    </div>
  );
};

export default IngredientsItem;
