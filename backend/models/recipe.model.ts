import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize';
import User from './user.model';

export enum RecipeCategories {
  pastas = 'pastas',
  fish = 'fish',
  meat = 'meat',
  vegan = 'vegan',
  salads = 'salads',
  breakfast = 'breakfast',
  fingerFood = 'fingerFood',
  desserts = 'desserts',
  soups = 'soups',
  pizzas = 'pizzas',
}

export enum Difficulties {
  easy = 'easy',
  medium = 'medium',
  hard = 'hard',
}

export type RecipeType = {
  id?: number;
  title: string;
  duration?: { hours: number; minutes: number };
  description?: string;
  difficulty: Difficulties;
  category: RecipeCategories;
  tags?: string[];
  photos?: string[];
  userId: number;
};

const Recipe = sequelize.define<Model<RecipeType>>(
  'Recipe',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Enable auto-increment for the ID field
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    duration: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        notEmpty: true,
      },
    },
    difficulty: {
      type: DataTypes.ENUM(...Object.values(Difficulties)),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    category: {
      type: DataTypes.ENUM(
        ...Object.values(RecipeCategories)
      ),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    // tags: {
    //   type: DataTypes.JSON,
    //   allowNull: true,
    // },
    photos: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
      allowNull: false,
    },
  },
  {
    tableName: 'recipes',
    timestamps: true,
    paranoid: true, // Enables the `deletedAt` field for soft deletes
  }
);

export default Recipe;
