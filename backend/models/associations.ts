import User from './user.model';
import Token from './token.model';
import Recipe from './recipe.model';
import Ingredient from './ingredient.model';
import Unit from './unit.model';
import RecipeIngredient from './recipe-ingedient.model';
import Preperation from './preperation.model';
// import Duration from './duration.model';

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

// // Recipe with Duration relations
// Recipe.hasOne(Duration, {
//   foreignKey: 'recipeId',
//   onDelete: 'CASCADE',
// });
// Duration.belongsTo(Recipe, {
//   foreignKey: 'recipeId',
// });
