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
  generateRecipeIngredient(200, 1, 3, 1), // 200 g spaghetti
  generateRecipeIngredient(250, 1, 3, 2), // 250 g ground beef
  generateRecipeIngredient(1, 1, 1, 3), // 1 unit onion
  generateRecipeIngredient(2, 1, 1, 4), // 2 units garlic cloves
  generateRecipeIngredient(2, 1, 7, 5), // 2 tbsp olive oil
  generateRecipeIngredient(1, 1, 1, 6), // 1 unit carrot
  generateRecipeIngredient(1, 1, 1, 7), // 1 unit celery stalk
  generateRecipeIngredient(1, 1, 8, 8), // 1 tsp salt
  generateRecipeIngredient(1, 1, 8, 9), // 1 tsp black pepper
  generateRecipeIngredient(1, 1, 8, 10), // 1 tsp dried oregano
  generateRecipeIngredient(1, 1, 8, 11), // 1 tsp dried basil
  generateRecipeIngredient(50, 1, 3, 12), // 50 g parmesan cheese

  // Caesar Salad
  generateRecipeIngredient(1, 2, 1, 13), // 1 unit romaine lettuce
  generateRecipeIngredient(0.5, 2, 9, 14), // 0.5 cup Caesar dressing
  generateRecipeIngredient(1, 2, 9, 15), // 1 cup croutons
  generateRecipeIngredient(1, 2, 8, 16), // 1 tsp lemon juice

  // Chicken Curry
  generateRecipeIngredient(500, 3, 3, 17), // 500 g chicken
  generateRecipeIngredient(400, 3, 6, 18), // 400 ml coconut milk
  generateRecipeIngredient(2, 3, 8, 19), // 2 tsp curry powder
  generateRecipeIngredient(1, 3, 1, 20), // 1 unit ginger
  generateRecipeIngredient(2, 3, 1, 21), // 2 units tomatoes
  generateRecipeIngredient(1, 3, 8, 22), // 1 tsp cumin
  generateRecipeIngredient(1, 3, 8, 23), // 1 tsp coriander
  generateRecipeIngredient(1, 3, 8, 24), // 1 tsp turmeric
  generateRecipeIngredient(0.5, 3, 8, 25), // 0.5 tsp chili powder
  generateRecipeIngredient(2, 3, 7, 26), // 2 tbsp vegetable oil
  generateRecipeIngredient(1, 3, 1, 27), // 1 unit fresh cilantro handful

  // Pancakes
  generateRecipeIngredient(1, 4, 1, 28), // 1 unit egg
  generateRecipeIngredient(1.5, 4, 9, 29), // 1.5 cups all-purpose flour
  generateRecipeIngredient(1, 4, 6, 30), // 1 ml milk
  generateRecipeIngredient(3.5, 4, 8, 31), // 3.5 tsp baking powder
  generateRecipeIngredient(1, 4, 8, 32), // 1 tsp salt
  generateRecipeIngredient(1, 4, 6, 33), // 1 ml butter (melted)
  generateRecipeIngredient(1, 4, 8, 34), // 1 tsp vanilla extract

  // Chocolate Cake
  generateRecipeIngredient(2, 5, 1, 35), // 2 units eggs
  generateRecipeIngredient(1.5, 5, 9, 36), // 1.5 cups sugar
  generateRecipeIngredient(1.75, 5, 9, 37), // 1.75 cups flour
  generateRecipeIngredient(0.75, 5, 9, 38), // 0.75 cup cocoa powder
  generateRecipeIngredient(1.5, 5, 9, 39), // 1.5 cups milk
  generateRecipeIngredient(1, 5, 6, 40), // 1 ml vegetable oil
  generateRecipeIngredient(2, 5, 8, 41), // 2 tsp baking soda
  generateRecipeIngredient(1, 5, 8, 42), // 1 tsp vanilla extract
  generateRecipeIngredient(1, 5, 9, 43), // 1 cup boiling water

  // Grilled Cheese Sandwich
  generateRecipeIngredient(2, 6, 1, 44), // 2 slices bread
  generateRecipeIngredient(2, 6, 1, 45), // 2 slices cheese
  generateRecipeIngredient(1, 6, 6, 46), // 1 ml butter

  // Beef Stroganoff
  generateRecipeIngredient(500, 7, 3, 47), // 500 g beef
  generateRecipeIngredient(200, 7, 3, 48), // 200 g mushrooms
  generateRecipeIngredient(1, 7, 1, 49), // 1 unit onion
  generateRecipeIngredient(2, 7, 7, 50), // 2 tbsp sour cream
  generateRecipeIngredient(1, 7, 8, 51), // 1 tsp mustard
  generateRecipeIngredient(2, 7, 7, 52), // 2 tbsp butter
  generateRecipeIngredient(1, 7, 8, 53), // 1 tsp paprika

  // Avocado Toast
  generateRecipeIngredient(1, 8, 1, 54), // 1 unit avocado
  generateRecipeIngredient(1, 8, 1, 55), // 1 unit bread slice
  generateRecipeIngredient(1, 8, 8, 56), // 1 tsp salt
  generateRecipeIngredient(1, 8, 8, 57), // 1 tsp pepper

  // French Onion Soup
  generateRecipeIngredient(3, 9, 1, 58), // 3 units onions
  generateRecipeIngredient(2, 9, 9, 59), // 2 cups beef broth
  generateRecipeIngredient(1, 9, 9, 60), // 1 cup dry white wine
  generateRecipeIngredient(2, 9, 7, 61), // 2 tbsp butter
  generateRecipeIngredient(1, 9, 8, 62), // 1 tsp thyme
  generateRecipeIngredient(1, 9, 8, 63), // 1 tsp sugar
  generateRecipeIngredient(1, 9, 1, 64), // 1 unit baguette

  // Tacos al Pastor
  generateRecipeIngredient(500, 10, 3, 65), // 500 g pork
  generateRecipeIngredient(1, 10, 1, 66), // 1 unit pineapple
  generateRecipeIngredient(2, 10, 1, 67), // 2 units tortillas
  generateRecipeIngredient(1, 10, 8, 68), // 1 tsp salt
  generateRecipeIngredient(1, 10, 8, 69), // 1 tsp paprika

  // Quiche Lorraine
  generateRecipeIngredient(1, 11, 1, 70), // 1 unit pie crust
  generateRecipeIngredient(4, 11, 1, 71), // 4 units eggs
  generateRecipeIngredient(1, 11, 9, 72), // 1 cup milk
  generateRecipeIngredient(200, 11, 3, 73), // 200 g bacon
  generateRecipeIngredient(100, 11, 3, 74), // 100 g cheese

  // Chocolate Chip Cookies
  generateRecipeIngredient(2, 12, 1, 75), // 2 units eggs
  generateRecipeIngredient(2.5, 12, 9, 76), // 2.5 cups flour
  generateRecipeIngredient(1, 12, 6, 77), // 1 ml butter
  generateRecipeIngredient(1, 12, 9, 78), // 1 cup sugar
  generateRecipeIngredient(1, 12, 9, 79), // 1 cup chocolate chips

  // Shrimp Scampi
  generateRecipeIngredient(500, 13, 3, 80), // 500 g shrimp
  generateRecipeIngredient(300, 13, 3, 81), // 300 g linguine
  generateRecipeIngredient(3, 13, 7, 82), // 3 tbsp butter
  generateRecipeIngredient(2, 13, 8, 83), // 2 tsp garlic
  generateRecipeIngredient(1, 13, 9, 84), // 1 cup white wine

  // Vegetable Stir-fry
  generateRecipeIngredient(400, 14, 3, 85), // 400 g mixed vegetables
  generateRecipeIngredient(2, 14, 7, 86), // 2 tbsp soy sauce
  generateRecipeIngredient(1, 14, 7, 87), // 1 tbsp sesame oil

  // Lasagna
  generateRecipeIngredient(12, 15, 1, 88), // 12 units lasagna sheets
  generateRecipeIngredient(500, 15, 3, 89), // 500 g ricotta cheese
  generateRecipeIngredient(500, 15, 3, 90), // 500 g mozzarella cheese
  generateRecipeIngredient(300, 15, 9, 91), // 300 ml marinara sauce
  generateRecipeIngredient(1, 15, 1, 92), // 1 unit egg

  // Margarita Pizza
  generateRecipeIngredient(1, 16, 1, 93), // 1 unit pizza dough
  generateRecipeIngredient(300, 16, 3, 94), // 300 g mozzarella cheese
  generateRecipeIngredient(200, 16, 9, 95), // 200 ml tomato sauce
  generateRecipeIngredient(1, 16, 1, 96), // 1 unit fresh basil bunch
  generateRecipeIngredient(2, 16, 7, 97), // 2 tbsp olive oil
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
