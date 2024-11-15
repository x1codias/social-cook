import { DataTypes, Model } from 'sequelize';
import Recipe from './recipe.model';
import sequelize from '../sequelize';

export type PreperationType = {
  id?: number;
  prepVideo?: string;
  steps?: {
    photo?: string;
    description: string;
  }[];
  recipeId: number;
};

const Preperation = sequelize.define<
  Model<PreperationType>
>(
  'Preperation',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    prepVideo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    steps: {
      type: DataTypes.JSON,
      allowNull: true,
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
    tableName: 'preperations',
    timestamps: true,
    paranoid: true, // Enables the `deletedAt` field for soft deletes
  }
);

export default Preperation;
