import theme from '../../../../../themes/global.theme';
import {
  Ingredient,
  IngredientItem,
} from '../../../../../utils/types/Ingredient';
import { Delete } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { AppDispatch } from '../../../../../store';
import { useDispatch } from 'react-redux';
import { getIngredients } from '../../../../../actions/ingredient.actions';
import { getUnits } from '../../../../../actions/unit.actions';
import { useCallback, useEffect, useState } from 'react';
import DefaultSelect from '../../../../../utils/components/select';
import { Unit } from '../../../../../utils/types/Unit';
import {
  filteredIngredientScrollData,
  filteredUnitScrollData,
} from '../../../../../utils/memoized-selectors';
import AddIngredient from '../add-ingredient';
import DefaultInput from '../../../../../utils/components/input/input';

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
  const [openAddModal, setOpenAddModal] = useState(false);
  const [searchValUnit, setSearchValUnit] = useState('');
  const [searchValIngredient, setSearchValIngredient] =
    useState('');
  const unitScrollData = useSelector(
    filteredUnitScrollData(searchValUnit)
  );
  const ingredientScrollData = useSelector(
    filteredIngredientScrollData(searchValIngredient)
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
    value: number,
    valueToChange: string
  ) => {
    const ingredientsDataCopy = [...ingredientsData];
    ingredientsDataCopy[ingIndex] = {
      ...ingredientsDataCopy[ingIndex],
      [valueToChange]: value,
    };
    setIngredientsData(ingredientsDataCopy);
  };

  return (
    <>
      <div
        key={ingredient.name}
        style={{ display: 'flex', gap: '8px' }}
      >
        <DefaultSelect<Ingredient>
          value={ingredient.name}
          options={ingredientScrollData.ingredients}
          onChange={(val, valToChange) =>
            valToChange === 'value'
              ? handleOnDataChange(val as number, 'name')
              : setSearchValIngredient(val as string)
          }
          label={'Choose an ingredient'}
          minWidth={170}
          onOpen={() => setSelectOpened('ingredient')}
          onClose={() => setSelectOpened('')}
          search
          addBtnLbl={'Add Ingredient'}
          onAddClick={() => setOpenAddModal(true)}
        />
        <DefaultInput
          placeholder={'Quantity'}
          type={'number'}
          InputProps={{
            inputProps: { min: 1 },
          }}
          maxWidth={'110px'}
          minWidth={'80px'}
          value={ingredient.quantity}
          onChange={e =>
            handleOnDataChange(
              parseInt(e.target.value),
              'quantity'
            )
          }
        />
        <DefaultSelect<Unit>
          value={ingredient.unit}
          options={unitScrollData.units}
          onChange={(val, valToChange) =>
            valToChange === 'value'
              ? handleOnDataChange(val as number, 'unit')
              : setSearchValUnit(val as string)
          }
          label={'Choose an unit'}
          minWidth={170}
          onOpen={() => setSelectOpened('unit')}
          onClose={() => setSelectOpened('')}
          search
        />
        <Delete
          style={{
            fill: theme.palette.customError.main,
            alignSelf: 'center',
            cursor: 'pointer',
            fontSize: '24px',
          }}
          fontSize={'large'}
          onClick={() => handleDeleteIngredient()}
        />
      </div>
      <AddIngredient
        openAddModal={openAddModal}
        setOpenAddModal={setOpenAddModal}
      />
    </>
  );
};

export default IngredientsItem;
