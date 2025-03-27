'use strict';

const generatePreparation = (
  recipeId,
  prepVideo,
  steps
) => ({
  recipeId,
  prepVideo,
  steps: steps
    ? JSON.stringify(
        steps.map(step => ({
          description: step, // Assuming step is just a string, it will be the description
          photo: null, // Optional photo, you can add a URL if needed
        }))
      )
    : null, // In case steps is null, we keep it as null
  createdAt: new Date(),
  updatedAt: new Date(),
});

const preparations = [
  generatePreparation(
    1,
    'https://www.youtube.com/watch?v=v2WqcHH65NQ',
    null
  ),
  generatePreparation(2, null, [
    'Wash and chop the romaine lettuce.',
    'Prepare Caesar dressing in a bowl or use store-bought.',
    'Mix lettuce with dressing and top with croutons and Parmesan cheese.',
  ]),
  generatePreparation(
    3,
    'https://www.youtube.com/watch?v=jwyge5daKUQ',
    null
  ),
  generatePreparation(4, null, [
    'In a mixing bowl, combine flour, sugar, baking powder, and salt.',
    'Add milk, eggs, and melted butter. Whisk until smooth.',
    'Pour batter onto a hot greased skillet and cook until golden on both sides.',
  ]),
  generatePreparation(
    5,
    'https://www.youtube.com/watch?v=EaljSnLrJW8',
    null
  ),
  generatePreparation(6, null, [
    'Butter two slices of bread on one side each.',
    'Place cheese between the unbuttered sides and close the sandwich.',
    'Heat a pan and grill the sandwich until crispy on both sides.',
  ]),
  generatePreparation(
    7,
    'https://www.youtube.com/watch?v=7r3dlmYUf4s',
    null
  ),
  generatePreparation(8, null, [
    'Toast the bread slices.',
    'Mash avocado with a fork, adding salt and pepper to taste.',
    'Spread mashed avocado on toast and sprinkle red pepper flakes.',
  ]),
  generatePreparation(
    9,
    'https://www.youtube.com/watch?v=7lX2EhqsdkA',
    null
  ),
  generatePreparation(10, null, [
    'Marinate pork slices in a mixture of chili peppers, vinegar, and pineapple juice.',
    'Cook marinated pork in a skillet until tender.',
    'Serve pork on warmed corn tortillas with pineapple chunks and fresh cilantro.',
  ]),
  generatePreparation(
    11,
    'https://www.youtube.com/watch?v=kLzDztWY9HQ',
    null
  ),
  generatePreparation(12, null, [
    'Preheat the oven and line a baking sheet with parchment paper.',
    'Mix flour, baking soda, and salt in a bowl.',
    'In another bowl, cream butter and sugars, then add eggs and vanilla.',
    'Combine dry and wet ingredients and stir in chocolate chips.',
    'Scoop onto the baking sheet and bake until golden brown.',
  ]),
  generatePreparation(
    13,
    'https://www.youtube.com/watch?v=t-xM807ZV6w',
    null
  ),
  generatePreparation(14, null, [
    'Heat oil in a pan and add minced garlic and ginger.',
    'Add chopped vegetables and stir-fry on high heat.',
    'Mix soy sauce and cornstarch into a slurry and pour over vegetables.',
    'Stir until vegetables are coated and serve hot.',
  ]),
  generatePreparation(
    15,
    'https://www.youtube.com/watch?v=PtL6nsAbchA',
    null
  ),
  generatePreparation(16, null, [
    'Preheat oven and roll out the pizza dough on a baking sheet.',
    'Spread tomato sauce on the dough and top with fresh mozzarella.',
    'Bake until the crust is golden and cheese is bubbly.',
    'Add fresh basil leaves before serving.',
  ]),
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkInsert(
        'preperations',
        preparations,
        {}
      );
    } catch (error) {
      console.error('Error during bulk insert:', error);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      'preperations',
      null,
      {}
    );
  },
};
