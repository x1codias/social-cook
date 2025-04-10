import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize';
import Recipe from './recipe.model';
import User from './user.model';

export type RatingType = {
  rating: number;
  userId: number;
  recipeId: number;
  avgRating?: number;
};

const Rating = sequelize.define<Model<RatingType>>(
  'Rating',
  {
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
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
  },
  {
    tableName: 'ratings',
    timestamps: true,
    paranoid: true, // Enables the `deletedAt` field for soft deletes
  }
);

export default Rating;
