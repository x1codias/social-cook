'use strict';

const generateRecipe = (
  title,
  hours,
  minutes,
  description,
  difficulty,
  category,
  userId,
  photos,
  servings
) => ({
  title,
  duration: JSON.stringify({
    hours,
    minutes,
  }),
  description,
  difficulty,
  category,
  photos: JSON.stringify(photos),
  userId,
  servings,
  createdAt: new Date(),
  updatedAt: new Date(),
});

const recipes = [
  generateRecipe(
    'Spaghetti Bolognese',
    1,
    30,
    'Classic Italian pasta dish with rich meat sauce.',
    'medium',
    'pastas',
    1,
    [
      'https://www.recipetineats.com/tachyon/2018/07/Spaghetti-Bolognese.jpg',
    ],
    2
  ),
  generateRecipe(
    'Caesar Salad',
    0,
    20,
    'Crisp romaine lettuce with Caesar dressing and croutons.',
    'easy',
    'salads',
    2,
    [
      'https://www.allrecipes.com/thmb/mXZ0Tulwn3x9_YB_ZbkiTveDYFE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/229063-Classic-Restaurant-Caesar-Salad-ddmfs-4x3-231-89bafa5e54dd4a8c933cf2a5f9f12a6f.jpg',
    ],
    1
  ),
  generateRecipe(
    'Chicken Curry',
    2,
    0,
    'A flavorful chicken curry with spices and coconut milk.',
    'hard',
    'meat',
    3,
    [
      'https://www.allrecipes.com/thmb/FL-xnyAllLyHcKdkjUZkotVlHR8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/46822-indian-chicken-curry-ii-DDMFS-4x3-39160aaa95674ee395b9d4609e3b0988.jpg',
    ],
    3
  ),
  generateRecipe(
    'Pancakes',
    0,
    15,
    'Fluffy pancakes with syrup and butter.',
    'easy',
    'breakfast',
    4,
    [
      'https://www.allrecipes.com/thmb/FE0PiuuR0Uh06uVh1c2AsKjRGbc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/21014-Good-old-Fashioned-Pancakes-mfs_002-0e249c95678f446291ebc9408ae64c05.jpg',
    ],
    2
  ),
  generateRecipe(
    'Chocolate Cake',
    1,
    45,
    'Moist and rich chocolate cake with frosting.',
    'medium',
    'desserts',
    5,
    [
      'https://scientificallysweet.com/wp-content/uploads/2020/09/IMG_4117-feature.jpg',
    ],
    3
  ),
  generateRecipe(
    'Grilled Cheese Sandwich',
    0,
    10,
    'Crispy grilled cheese sandwich with melted cheese.',
    'easy',
    'fingerFood',
    6,
    [
      'https://cdn.loveandlemons.com/wp-content/uploads/2023/01/grilled-cheese.jpg',
    ],
    1
  ),
  generateRecipe(
    'Beef Stroganoff',
    1,
    10,
    'A creamy beef and mushroom dish served over noodles, perfect for a hearty meal.',
    'medium',
    'meat',
    7,
    [
      'https://www.allrecipes.com/thmb/mSWde3PHTu-fDkbvWBw0D1JlS8U=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/25202beef-stroganoff-iii-ddmfs-3x4-233-0f26fa477e9c446b970a32502468efc6.jpg',
    ],
    2
  ),
  generateRecipe(
    'Avocado Toast',
    0,
    5,
    'Mashed avocado on toasted bread with a sprinkle of salt and pepper.',
    'easy',
    'fingerFood',
    8,
    [
      'https://www.eatingbirdfood.com/wp-content/uploads/2023/12/avocado-toast-hero-cropped.jpg',
    ],
    3
  ),
  generateRecipe(
    'French Onion Soup',
    1,
    30,
    'A rich and savory soup made with caramelized onions, beef broth, and topped with melted cheese.',
    'Medium',
    'soups',
    9,
    [
      'https://www.simplyrecipes.com/thmb/pO8Mz9BAGEmAOBylOojpwbx8OHo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-French-Onion-Soup-LEAD-06-00d3b5bcdf4a4261b89e1be4aedf90f3.jpg',
    ],
    4
  ),
  generateRecipe(
    'Tacos al Pastor',
    2,
    0,
    'Traditional Mexican street tacos with marinated pork and pineapple.',
    'hard',
    'meat',
    6,
    [
      'https://www.seriouseats.com/thmb/4kbwN13BlZnZ3EywrtG2AzCKuYs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/20210712-tacos-al-pastor-melissa-hom-seriouseats-37-f72cdd02c9574bceb1eef1c8a23b76ed.jpg',
    ],
    5
  ),
  generateRecipe(
    'Quiche Lorraine',
    1,
    20,
    'A savory pie filled with eggs, cream, bacon, and cheese, perfect for breakfast or brunch.',
    'medium',
    'breakfast',
    6,
    [
      'https://www.allrecipes.com/thmb/plG7UKAQvPQdn04AA_SBfj88ki0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/17515-quiche-lorraine-i-DDMFS-4x3-efda035d462a4242b7a18f39e21df047.jpg',
    ],
    1
  ),
  generateRecipe(
    'Chocolate Chip Cookies',
    0,
    25,
    'Classic chewy chocolate chip cookies with crispy edges and a gooey center.',
    'easy',
    'desserts',
    12,
    [
      'https://sallysbakingaddiction.com/wp-content/uploads/2013/05/classic-chocolate-chip-cookies.jpg',
    ],
    2
  ),
  generateRecipe(
    'Shrimp Scampi',
    0,
    30,
    'Succulent shrimp sautéed in garlic butter, served over a bed of linguine.',
    'medium',
    'fish',
    10,
    [
      'https://static01.nyt.com/images/2022/06/02/dining/ShrimpScampi_thumb/ShrimpScampi_thumb-square640.jpg',
    ],
    3
  ),
  generateRecipe(
    'Vegetable Stir-fry',
    0,
    20,
    'A quick and healthy stir-fry made with a mix of colorful vegetables and soy sauce.',
    'easy',
    'vegan',
    9,
    [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiphrNcjfvL_UgvwWdgU6GdmJzN-6qV7MleA&s',
    ],
    4
  ),
  generateRecipe(
    'Lasagna',
    2,
    15,
    'Layered pasta, meat sauce, and cheese baked to perfection, a hearty Italian dish.',
    'hard',
    'pastas',
    8,
    [
      'https://assets.bonappetit.com/photos/656f48d75b552734225041ba/1:1/w_3129,h_3129,c_limit/20231120-WEB-Lasanga-6422.jpg',
    ],
    2
  ),
  generateRecipe(
    'Margarita Pizza',
    0,
    45,
    'A thin-crust pizza topped with fresh mozzarella, basil, and tomato sauce.',
    'medium',
    'pizzas',
    8,
    [
      'https://cdn.loveandlemons.com/wp-content/uploads/opengraph/2023/07/margherita-pizza-recipe.jpg',
    ],
    2
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
