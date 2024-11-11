'use strict';

const generateUnits = (name, symbol) => ({
  name,
  symbol,
  createdAt: new Date(),
  updatedAt: new Date(),
});

const units = [
  generateUnits('Unit', 'uni'),
  generateUnits('Kilogram', 'kg'),
  generateUnits('Gram', 'g'),
  generateUnits('Miligram', 'mg'),
  generateUnits('Litre', 'l'),
  generateUnits('Mililitre', 'ml'),
  generateUnits('Table Spoon', 'table sp.'),
  generateUnits('Tea Spoon', 'tea sp.'),
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('units', units, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('units', null, {});
  },
};
