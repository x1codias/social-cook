import User from './user.model';
import Token from './token.model';
import Recipe from './recipe.model';
import Ingredient from './ingredient.model';
import Unit from './unit.model';
import RecipeIngredient from './recipe-ingedient.model';

// User with tokens relations
User.hasOne(Token, { foreignKey: 'userId' });
Token.belongsTo(User, { foreignKey: 'userId' });

// Recipe with Ingredients relations
Recipe.belongsToMany(Ingredient, {
  through: RecipeIngredient,
});
Ingredient.belongsToMany(Recipe, {
  through: RecipeIngredient,
});

// Unit with RecipeIngredient relations
Unit.hasMany(RecipeIngredient, { foreignKey: 'unitId' });
RecipeIngredient.belongsTo(Unit, { foreignKey: 'unitId' });

// User with Recipes relations
User.hasMany(Recipe, { foreignKey: 'userId' });
Recipe.belongsTo(User, { foreignKey: 'userId' });
