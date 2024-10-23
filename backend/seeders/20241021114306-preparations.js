'use strict';

const preparationSteps = [
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley",
  'It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
  'It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
  'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
  "If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.",
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const preparations = Array(20).map(
      (_preparation, index) => ({
        recipeId: index,
        steps: preparationSteps,
      })
    );

    await queryInterface.bulkInsert(
      'preperations',
      preparations,
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      'preperations',
      null,
      {}
    );
  },
};
