import { useCallback, useEffect, useState } from 'react';
import { RecipeDetails } from '../../pages/recipe/create/types/types';
import { IngredientItem } from '../types/Ingredient';
import { Preparation } from '../types/Preparation';

const useValidateRecipe = (
  step: number,
  recipeDetails: RecipeDetails,
  recipeIngredients: IngredientItem[],
  recipePreparation: Preparation
) => {
  const [canProceed, setCanProceed] = useState(false);

  const validateDetails = useCallback(() => {
    const hasTextFields =
      recipeDetails.title.length > 0 &&
      recipeDetails.description.length > 0;

    const hasNumberFields =
      (recipeDetails.duration.hours > 0 ||
        recipeDetails.duration.minutes > 0) &&
      recipeDetails.servings > 0;

    const hasValuesSelected =
      recipeDetails.category.length > 0 &&
      recipeDetails.difficulty.length > 0;

    const hasPhotos = recipeDetails.photos.length > 0;

    return (
      hasNumberFields &&
      hasPhotos &&
      hasTextFields &&
      hasValuesSelected
    );
  }, [recipeDetails]);

  const validateIngredients = useCallback(() => {
    const hasIngredients = recipeIngredients.length > 0;

    const validIngredientFields = recipeIngredients.some(
      ingredient =>
        (ingredient.name as number) > 0 &&
        ingredient.quantity > 0 &&
        (ingredient.name as number) > 0
    );

    return hasIngredients && validIngredientFields;
  }, [recipeIngredients]);

  const validatePreparation = useCallback(() => {
    const hasVideo = !!recipePreparation.video;

    const hasValidSteps =
      recipePreparation.steps.length > 0 &&
      recipePreparation.steps.some(
        step => step.description.length > 0
      );

    return hasVideo || hasValidSteps;
  }, [recipePreparation]);

  useEffect(() => {
    switch (step) {
      case 0:
        return setCanProceed(validateDetails());
      case 1:
        return setCanProceed(validateIngredients());
      case 2:
        return setCanProceed(validatePreparation);
    }
  }, [
    step,
    validateDetails,
    validateIngredients,
    validatePreparation,
    setCanProceed,
  ]);

  return { canProceed };
};

export default useValidateRecipe;
