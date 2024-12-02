'use strict';

const generateUnits = (name, symbol) => ({
  name,
  symbol,
  createdAt: new Date(),
  updatedAt: new Date(),
});

const units = [
  generateUnits('unit', 'uni'),
  generateUnits('kilogram', 'kg'),
  generateUnits('gram', 'g'),
  generateUnits('miligram', 'mg'),
  generateUnits('litre', 'l'),
  generateUnits('mililitre', 'ml'),
  generateUnits('tableSpoon', 'table sp.'),
  generateUnits('teaSpoon', 'tea sp.'),
  generateUnits('cup', 'cup'),
  generateUnits('pinch', 'pinch'),
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
