'use strict';

const ingredients = [
  'spaghettiPasta',
  'groundBeef',
  'tomatoSauce',
  'onion',
  'garlic',
  'oliveOil',
  'carrot',
  'celery',
  'salt',
  'blackPepper',
  'driedOregano',
  'driedBasil',
  'parmesanCheese',
  'romaineLettuce',
  'caesarDressing',
  'croutons',
  'lemonJuice',
  'chicken',
  'coconutMilk',
  'curryPowder',
  'ginger',
  'tomatoes',
  'cumin',
  'coriander',
  'turmeric',
  'chiliPowder',
  'vegetableOil',
  'freshCilantro',
  'allPurposeFlour',
  'bakingPowder',
  'sugar',
  'milk',
  'eggs',
  'butter',
  'mapleSyrup',
  'cocoaPowder',
  'bakingSoda',
  'vanillaExtract',
  'chocolateFrosting',
  'breadSlices',
  'boilingWater',
  'cheese',
  'cheeseSlices',
  'mushrooms',
  'sourCream',
  'beefBroth',
  'mustard',
  'worcestershireSauce',
  'paprika',
  'eggNoodles',
  'avocado',
  'redPepperFlakes',
  'beef',
  'yellowOnions',
  'thyme',
  'bayLeaf',
  'frenchBread',
  'gruyereCheese',
  'pork',
  'pineapple',
  'chiliPeppers',
  'vinegar',
  'pineappleJuice',
  'cornTortillas',
  'limeWedges',
  'pieCrust',
  'heavyCream',
  'bacon',
  'nutmeg',
  'chocolateChips',
  'shrimp',
  'linguine',
  'whiteWine',
  'baguette',
  'parsley',
  'assortedVegetables',
  'soySauce',
  'cornstarch',
  'sesameOil',
  'lasagnaNoodles',
  'ricottaCheese',
  'mozzarellaCheese',
  'pizzaDough',
  'freshMozzarella',
  'freshBasil',
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const ingredientsMapped = ingredients.map(
      ingredient => ({
        name: ingredient,
        createdAt: new Date(),
        updatedAt: new Date(),
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
