import Preperation from '../models/preperation.model';

const getRecipePreparationsService = async (
  recipeId: number
) => {
  const preparations = await Preperation.findAll({
    where: {
      recipeId,
    },
  });

  return {
    preparations: preparations.map(preparation =>
      preparation.get()
    ),
  };
};

export { getRecipePreparationsService };
