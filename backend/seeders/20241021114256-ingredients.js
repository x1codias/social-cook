'use strict';

const ingredients = [
  'egg',
  'milk',
  'rice',
  'olive oil',
  'onion',
  'garlic',
  'chicken',
  'beef',
  'ham',
  'salt',
  'lemon',
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const ingredientsMapped = ingredients.map(
      ingredient => ({
        name: ingredient.name,
      })
    );

    await queryInterface.bulkInsert(
      'ingredients',
      ingredientsMapped,
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      'ingredients',
      null,
      {}
    );
  },
};
