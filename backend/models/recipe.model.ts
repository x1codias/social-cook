import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize';

export type RecipeType = {
  id?: number;
};

const Recipe = sequelize.define<Model<RecipeType>>(
  'Recipe',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Enable auto-increment for the ID field
    },
  },
  {
    tableName: 'recipes',
    timestamps: true,
  }
);

export default Recipe;
