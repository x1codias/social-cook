import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize';
import { RecipeCategories } from './recipe.model';
import User from './user.model';

export enum SearchHistoryContext {
  recipe = 'recipe',
  category = 'category',
  user = 'user',
}

export type SearchHistoryType = {
  id?: number;
  context: SearchHistoryContext;
  value: string | RecipeCategories;
  userId: number;
};

const SearchHistory = sequelize.define<
  Model<SearchHistoryType>
>(
  'SearchHistory',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Enable auto-increment for the ID field
    },
    context: {
      type: DataTypes.ENUM(
        ...Object.values(SearchHistoryContext)
      ),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isValidValue() {
          if (
            typeof this.value !== 'string' &&
            this.context ===
              SearchHistoryContext.category &&
            !Object.values(RecipeCategories).includes(
              this.value as RecipeCategories
            )
          ) {
            throw new Error(
              'Value must be a string or a valid RecipeCategories value'
            );
          }
        },
      },
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
    tableName: 'search_history',
    timestamps: true,
    paranoid: true, // Enables the `deletedAt` field for soft deletes
  }
);

export default SearchHistory;
