import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize';
import User from './user.model';
import Recipe from './recipe.model';

export type CommentType = {
  id?: number;
  userId: number;
  recipeId: number;
  content: string;
  parentCommentId?: number;
};

const Comment = sequelize.define<Model<CommentType>>(
  'Comment',
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
      references: {
        model: Recipe,
        key: 'id',
      },
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    parentCommentId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'comments',
        key: 'id',
      },
      allowNull: true,
    },
  },
  {
    tableName: 'comments',
    timestamps: true,
    paranoid: true, // Enables the `deletedAt` field for soft deletes
  }
);

export default Comment;
