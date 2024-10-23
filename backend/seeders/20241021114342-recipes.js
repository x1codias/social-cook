'use strict';

const generateRecipe = (
  title,
  hours,
  minutes,
  description,
  difficulty,
  category,
  userId
) => ({
  title,
  duration: {
    hours,
    minutes,
  },
  description,
  difficulty,
  category,
  userId,
});

const recipes = [
  generateRecipe(
    'Spaghetti Bolognese',
    1,
    30,
    'Classic Italian pasta dish with rich meat sauce.',
    'medium',
    'pastas',
    1
  ),
  generateRecipe(
    'Caesar Salad',
    0,
    20,
    'Crisp romaine lettuce with Caesar dressing and croutons.',
    'easy',
    'salads',
    2
  ),
  generateRecipe(
    'Chicken Curry',
    2,
    0,
    'A flavorful chicken curry with spices and coconut milk.',
    'hard',
    'meat',
    3
  ),
  generateRecipe(
    'Pancakes',
    0,
    15,
    'Fluffy pancakes with syrup and butter.',
    'easy',
    'breakfast',
    4
  ),
  generateRecipe(
    'Chocolate Cake',
    1,
    45,
    'Moist and rich chocolate cake with frosting.',
    'medium',
    'desserts',
    5
  ),
  generateRecipe(
    'Grilled Cheese Sandwich',
    0,
    10,
    'Crispy grilled cheese sandwich with melted cheese.',
    'easy',
    'fingerFood',
    6
  ),
  generateRecipe(
    'Beef Stroganoff',
    1,
    10,
    'A creamy beef and mushroom dish served over noodles, perfect for a hearty meal.',
    'medium',
    'meat',
    7
  ),
  generateRecipe(
    'Avocado Toast',
    0,
    5,
    'Mashed avocado on toasted bread with a sprinkle of salt and pepper.',
    'easy',
    'fingerFood',
    8
  ),
  generateRecipe(
    'French Onion Soup',
    1,
    30,
    'A rich and savory soup made with caramelized onions, beef broth, and topped with melted cheese.',
    'Medium',
    'soups',
    9
  ),
  generateRecipe(
    'Tacos al Pastor',
    2,
    0,
    'Traditional Mexican street tacos with marinated pork and pineapple.',
    'hard',
    'meat',
    6
  ),
  generateRecipe(
    'Quiche Lorraine',
    1,
    20,
    'A savory pie filled with eggs, cream, bacon, and cheese, perfect for breakfast or brunch.',
    'medium',
    'breakfast',
    6
  ),
  generateRecipe(
    'Chocolate Chip Cookies',
    0,
    25,
    'Classic chewy chocolate chip cookies with crispy edges and a gooey center.',
    'easy',
    'desserts',
    12
  ),
  generateRecipe(
    'Shrimp Scampi',
    0,
    30,
    'Succulent shrimp sautéed in garlic butter, served over a bed of linguine.',
    'medium',
    'fish',
    10
  ),
  generateRecipe(
    'Vegetable Stir-fry',
    0,
    20,
    'A quick and healthy stir-fry made with a mix of colorful vegetables and soy sauce.',
    'easy',
    'vegan',
    9
  ),
  generateRecipe(
    'Lasagna',
    2,
    15,
    'Layered pasta, meat sauce, and cheese baked to perfection, a hearty Italian dish.',
    'hard',
    'pastas',
    8
  ),
  generateRecipe(
    'Margarita Pizza',
    0,
    45,
    'A thin-crust pizza topped with fresh mozzarella, basil, and tomato sauce.',
    'medium',
    'pizzas',
    8
  ),
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('recipes', recipes, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('recipes', null, {});
  },
};
