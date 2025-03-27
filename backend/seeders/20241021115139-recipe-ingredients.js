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
  // Spaghetti Bolognese
  generateRecipeIngredient(200, 1, 3, 1), // 200 g spaghettiPasta
  generateRecipeIngredient(250, 1, 3, 2), // 250 g groundBeef
  generateRecipeIngredient(1, 1, 1, 4), // 1 unit onion
  generateRecipeIngredient(2, 1, 1, 5), // 2 units garlic
  generateRecipeIngredient(2, 1, 7, 6), // 2 tbsp oliveOil
  generateRecipeIngredient(1, 1, 1, 7), // 1 unit carrot
  generateRecipeIngredient(1, 1, 1, 8), // 1 unit celery
  generateRecipeIngredient(1, 1, 8, 9), // 1 tsp salt
  generateRecipeIngredient(1, 1, 8, 10), // 1 tsp blackPepper
  generateRecipeIngredient(1, 1, 8, 11), // 1 tsp driedOregano
  generateRecipeIngredient(1, 1, 8, 12), // 1 tsp driedBasil
  generateRecipeIngredient(50, 1, 3, 13), // 50 g parmesanCheese

  // Caesar Salad
  generateRecipeIngredient(1, 2, 1, 14), // 1 unit romaineLettuce
  generateRecipeIngredient(0.5, 2, 9, 15), // 0.5 cup caesarDressing
  generateRecipeIngredient(1, 2, 9, 16), // 1 cup croutons
  generateRecipeIngredient(1, 2, 8, 17), // 1 tsp lemonJuice

  // Chicken Curry
  generateRecipeIngredient(500, 3, 3, 18), // 500 g chicken
  generateRecipeIngredient(400, 3, 6, 19), // 400 ml coconutMilk
  generateRecipeIngredient(2, 3, 8, 20), // 2 tsp curryPowder
  generateRecipeIngredient(1, 3, 1, 21), // 1 unit ginger
  generateRecipeIngredient(2, 3, 1, 22), // 2 units tomatoes
  generateRecipeIngredient(1, 3, 8, 23), // 1 tsp cumin
  generateRecipeIngredient(1, 3, 8, 24), // 1 tsp coriander
  generateRecipeIngredient(1, 3, 8, 25), // 1 tsp turmeric
  generateRecipeIngredient(0.5, 3, 8, 26), // 0.5 tsp chiliPowder
  generateRecipeIngredient(2, 3, 7, 27), // 2 tbsp vegetableOil
  generateRecipeIngredient(1, 3, 1, 28), // 1 unit freshCilantro

  // Pancakes
  generateRecipeIngredient(1, 4, 1, 33), // 1 unit egg
  generateRecipeIngredient(1.5, 4, 9, 29), // 1.5 cups allPurposeFlour
  generateRecipeIngredient(1, 4, 6, 31), // 1 ml milk
  generateRecipeIngredient(3.5, 4, 8, 32), // 3.5 tsp bakingPowder
  generateRecipeIngredient(1, 4, 8, 9), // 1 tsp salt
  generateRecipeIngredient(1, 4, 6, 34), // 1 ml butter
  generateRecipeIngredient(1, 4, 8, 38), // 1 tsp vanillaExtract

  // Chocolate Cake
  generateRecipeIngredient(2, 5, 1, 33), // 2 units eggs
  generateRecipeIngredient(1.5, 5, 9, 31), // 1.5 cups sugar
  generateRecipeIngredient(1.75, 5, 9, 29), // 1.75 cups allPurposeFlour
  generateRecipeIngredient(0.75, 5, 9, 36), // 0.75 cup cocoaPowder
  generateRecipeIngredient(1.5, 5, 9, 32), // 1.5 cups milk
  generateRecipeIngredient(1, 5, 6, 27), // 1 ml vegetableOil
  generateRecipeIngredient(2, 5, 8, 37), // 2 tsp bakingSoda
  generateRecipeIngredient(1, 5, 8, 38), // 1 tsp vanillaExtract
  generateRecipeIngredient(1, 5, 9, 41), // 1 cup boilingWater

  // Grilled Cheese Sandwich
  generateRecipeIngredient(2, 6, 1, 40), // 2 slices breadSlices
  generateRecipeIngredient(2, 6, 1, 43), // 2 slices cheese
  generateRecipeIngredient(1, 6, 6, 32), // 1 ml butter

  // Beef Stroganoff
  generateRecipeIngredient(500, 7, 3, 53), // 500 g beef
  generateRecipeIngredient(200, 7, 3, 44), // 200 g mushrooms
  generateRecipeIngredient(1, 7, 1, 4), // 1 unit onion
  generateRecipeIngredient(2, 7, 7, 45), // 2 tbsp sourCream
  generateRecipeIngredient(1, 7, 8, 47), // 1 tsp mustard
  generateRecipeIngredient(2, 7, 7, 27), // 2 tbsp vegetableOil
  generateRecipeIngredient(1, 7, 8, 49), // 1 tsp paprika

  // Avocado Toast
  generateRecipeIngredient(1, 8, 1, 51), // 1 unit avocado
  generateRecipeIngredient(1, 8, 1, 40), // 1 unit breadSlices
  generateRecipeIngredient(1, 8, 8, 9), // 1 tsp salt
  generateRecipeIngredient(1, 8, 8, 52), // 1 tsp pepper

  // French Onion Soup
  generateRecipeIngredient(3, 9, 1, 3), // 3 units onion (index 3)
  generateRecipeIngredient(2, 9, 9, 47), // 2 cups beefBroth (index 47)
  generateRecipeIngredient(1, 9, 9, 53), // 1 cup dry white wine (index 53)
  generateRecipeIngredient(2, 9, 7, 41), // 2 tbsp butter (index 41)
  generateRecipeIngredient(1, 9, 8, 61), // 1 tsp thyme (index 61)
  generateRecipeIngredient(1, 9, 8, 29), // 1 tsp sugar (index 29)
  generateRecipeIngredient(1, 9, 1, 74), // 1 unit baguette (index 61)

  // Tacos al Pastor
  generateRecipeIngredient(500, 10, 3, 58), // 500 g pork (index 58)
  generateRecipeIngredient(1, 10, 1, 40), // 1 unit pineapple (index 40)
  generateRecipeIngredient(2, 10, 1, 73), // 2 units cornTortillas (index 73)
  generateRecipeIngredient(1, 10, 8, 9), // 1 tsp salt (index 9)
  generateRecipeIngredient(1, 10, 8, 47), // 1 tsp paprika (index 47)

  // Quiche Lorraine
  generateRecipeIngredient(1, 11, 1, 60), // 1 unit pieCrust (index 60)
  generateRecipeIngredient(4, 11, 1, 35), // 4 units eggs (index 35)
  generateRecipeIngredient(1, 11, 9, 63), // 1 cup milk (index 63)
  generateRecipeIngredient(200, 11, 3, 56), // 200 g bacon (index 56)
  generateRecipeIngredient(100, 11, 3, 42), // 100 g cheese (index 42)

  // Chocolate Chip Cookies
  generateRecipeIngredient(2, 12, 1, 35), // 2 units eggs
  generateRecipeIngredient(2.5, 12, 9, 27), // 2.5 cups allPurposeFlour
  generateRecipeIngredient(1, 12, 6, 41), // 1 ml butter
  generateRecipeIngredient(1, 12, 9, 29), // 1 cup sugar
  generateRecipeIngredient(1, 12, 9, 46), // 1 cup chocolateChips

  // Shrimp Scampi
  generateRecipeIngredient(500, 13, 3, 58), // 500 g shrimp
  generateRecipeIngredient(300, 13, 3, 55), // 300 g linguine
  generateRecipeIngredient(3, 13, 7, 41), // 3 tbsp butter
  generateRecipeIngredient(2, 13, 8, 5), // 2 tsp garlic
  generateRecipeIngredient(1, 13, 9, 48), // 1 cup whiteWine

  // Vegetable Stir-fry
  generateRecipeIngredient(400, 14, 3, 69), // 400 g assortedVegetables
  generateRecipeIngredient(2, 14, 7, 71), // 2 tbsp soySauce
  generateRecipeIngredient(1, 14, 7, 73), // 1 tbsp sesameOil

  // Lasagna
  generateRecipeIngredient(12, 15, 1, 68), // 12 units lasagnaNoodles
  generateRecipeIngredient(500, 15, 3, 60), // 500 g ricottaCheese
  generateRecipeIngredient(500, 15, 3, 61), // 500 g mozzarellaCheese
  generateRecipeIngredient(300, 15, 9, 3), // 300 ml tomatoSauce
  generateRecipeIngredient(1, 15, 1, 35), // 1 unit egg

  // Margarita Pizza
  generateRecipeIngredient(1, 16, 1, 63), // 1 unit pizzaDough
  generateRecipeIngredient(300, 16, 3, 61), // 300 g mozzarellaCheese
  generateRecipeIngredient(200, 16, 9, 3), // 200 ml tomatoSauce
  generateRecipeIngredient(1, 16, 1, 78), // 1 unit freshBasil
  generateRecipeIngredient(2, 16, 7, 6), // 2 tbsp oliveOil
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkInsert(
        'recipe_ingredients',
        recipeIngredients,
        {}
      );
    } catch (error) {
      console.error('Error during bulk insert:', error);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      'recipe_ingredients',
      null,
      {}
    );
  },
};
