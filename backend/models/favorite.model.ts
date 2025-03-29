import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize';
import User from './user.model';
import Recipe from './recipe.model';

export type FavoriteType = {
  id?: number;
  userId: number;
  recipeId: number;
};

const Favorite = sequelize.define<Model<FavoriteType>>(
  'Favorite',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Enable auto-increment for the ID field
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
      allowNull: false,
    },
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Recipe,
        key: 'id',
      },
    },
  },
  {
    tableName: 'favorites',
    timestamps: true,
  }
);

export default Favorite;
