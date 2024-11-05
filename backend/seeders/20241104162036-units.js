'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const units = [
      {
        name: 'Unit',
        symbol: 'uni',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Kilogram',
        symbol: 'kg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Gram',
        symbol: 'g',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Miligram',
        symbol: 'mg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Litre',
        symbol: 'l',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Mililitre',
        symbol: 'ml',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Table Spoon',
        symbol: 'table sp.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Tea Spoon',
        symbol: 'tea sp.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('units', units, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('units', null, {});
  },
};
