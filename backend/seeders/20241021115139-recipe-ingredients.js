'use strict';

const generateRecipeIngredient = (
  quantity,
  recipeId,
  unitId,
  ingredientId
) => ({
  quantity,
  recipeId,
  unitId,
  ingredientId,
  createdAt: new Date(),
  updatedAt: new Date(),
});

const recipeIngredients = [
  generateRecipeIngredient(2, 2, 3, 1),
  generateRecipeIngredient(3, 2, 1, 2),
  generateRecipeIngredient(1, 2, 2, 4),
  generateRecipeIngredient(4, 1, 1, 2),
  generateRecipeIngredient(5, 1, 4, 3),
  generateRecipeIngredient(1, 3, 5, 7),
  generateRecipeIngredient(2, 3, 1, 11),
  generateRecipeIngredient(3, 3, 6, 10),
  generateRecipeIngredient(4, 3, 2, 4),
  generateRecipeIngredient(7, 3, 3, 3),
  generateRecipeIngredient(3, 4, 4, 2),
  generateRecipeIngredient(2, 4, 3, 1),
  generateRecipeIngredient(1, 5, 3, 8),
  generateRecipeIngredient(2, 5, 5, 9),
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'recipe_ingredients',
      recipeIngredients,
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      'recipe_ingredients',
      null,
      {}
    );
  },
};
