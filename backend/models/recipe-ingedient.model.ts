import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize';
import Unit from './unit.model';
import Recipe from './recipe.model';
import Ingredient from './ingredient.model';

export type RecipeIngredientType = {
  quantity: number;
  unitId: number;
  recipeId: number;
  ingredientId: number;
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
    unitId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Unit,
        key: 'id',
      },
    },
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Recipe,
        key: 'id',
      },
    },
    ingredientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Ingredient,
        key: 'id',
      },
    },
  },
  {
    tableName: 'recipe_ingredients',
    timestamps: true,
    paranoid: true, // Enables the `deletedAt` field for soft deletes
  }
);

export default RecipeIngredient;
