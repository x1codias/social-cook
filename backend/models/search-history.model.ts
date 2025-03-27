import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize';
import { RecipeCategories } from './recipe.model';
import User from './user.model';

export enum SearchHistoryContext {
  recipe = 'recipe',
  user = 'user',
}

export type SearchHistoryType = {
  id?: number;
  context: SearchHistoryContext;
  value: number;
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
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
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

SearchHistory.addHook(
  'beforeValidate',
  async searchHistory => {
    if (
      searchHistory.get().context ===
      SearchHistoryContext.recipe
    ) {
      const recipeExists =
        await sequelize.models.Recipe.findByPk(
          searchHistory.get().value
        );
      if (!recipeExists) {
        throw new Error('Invalid recipe ID');
      }
    } else if (
      searchHistory.get().context ===
      SearchHistoryContext.user
    ) {
      const userExists =
        await sequelize.models.User.findByPk(
          searchHistory.get().value
        );
      if (!userExists) {
        throw new Error('Invalid user ID');
      }
    }
  }
);

export default SearchHistory;
