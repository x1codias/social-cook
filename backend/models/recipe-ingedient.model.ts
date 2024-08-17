import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize';
import Unit from './unit.model';

export type RecipeIngredientType = {
  quantity: number;
  unitId: number;
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
  },
  {
    tableName: 'recipe_ingredients',
    timestamps: true,
  }
);

export default RecipeIngredient;
