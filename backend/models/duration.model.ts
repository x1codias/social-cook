import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize';
import Recipe from './recipe.model';

export type DurationType = {
  id?: number;
  hour: number;
  minute: number;
  recipeId: number;
};

const Duration = sequelize.define<Model<DurationType>>(
  'Duration',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    hour: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    minute: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
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
  },
  {
    tableName: 'durations',
    timestamps: true,
  }
);

export default Duration;
