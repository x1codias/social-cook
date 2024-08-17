import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize';
import Recipe from './recipe.model';
import Ingredient from './ingredient.model';
import Unit from './unit.model';

export type RecipeIngredientType = {
  quantity: number;
};

const RecipeIngredient = sequelize.define<
  Model<RecipeIngredientType>
>(
  'RecipeIngredient',
  {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    tableName: 'recipeIngredients',
    timestamps: true,
  }
);

Recipe.belongsToMany(Ingredient, {
  through: RecipeIngredient,
});
Ingredient.belongsToMany(Recipe, {
  through: RecipeIngredient,
});

Unit.hasMany(RecipeIngredient);
RecipeIngredient.belongsTo(Unit);

export default RecipeIngredient;
