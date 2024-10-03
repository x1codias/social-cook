import User from './user.model';
import Token from './token.model';
import Recipe from './recipe.model';
import Ingredient from './ingredient.model';
import Unit from './unit.model';
import RecipeIngredient from './recipe-ingedient.model';
import Preperation from './preperation.model';
import SearchHistory from './search-history.model';
import Favorite from './favorite.model';
import Rating from './rating.model';

// User with tokens relations
User.hasOne(Token, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});
Token.belongsTo(User, { foreignKey: 'userId' });

// Recipe with Ingredients relations
Recipe.belongsToMany(Ingredient, {
  through: RecipeIngredient,
  foreignKey: 'recipeId',
  onDelete: 'CASCADE',
});
Ingredient.belongsToMany(Recipe, {
  through: RecipeIngredient,
  foreignKey: 'ingredientId',
  onDelete: 'CASCADE',
});

// Unit with RecipeIngredient relations
Unit.hasMany(RecipeIngredient, {
  foreignKey: 'unitId',
  onDelete: 'CASCADE',
});
RecipeIngredient.belongsTo(Unit, { foreignKey: 'unitId' });

// User with Recipes relations
User.hasMany(Recipe, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});
Recipe.belongsTo(User, { foreignKey: 'userId' });

// Recipe with Preperations relations
Recipe.hasOne(Preperation, {
  foreignKey: 'recipeId',
  onDelete: 'CASCADE',
});
Preperation.belongsTo(Recipe, { foreignKey: 'recipeId' });

// User with SearchHistory relations
User.hasMany(SearchHistory, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});
SearchHistory.belongsTo(User, { foreignKey: 'userId' });

// User and Recipe with favorites
User.belongsToMany(Recipe, {
  through: Favorite,
  as: 'favorites',
  foreignKey: 'userId',
});
Recipe.belongsToMany(User, {
  through: Favorite,
  as: 'favoritedBy',
  foreignKey: 'recipeId',
});

// User and Recipe with Rating relations
User.hasMany(Rating, {
  foreignKey: 'userId',
  as: 'ratings',
});
Recipe.hasMany(Rating, {
  foreignKey: 'recipeId',
  as: 'ratings',
});
