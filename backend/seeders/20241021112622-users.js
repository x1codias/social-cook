'use strict';

const fs = require('fs'); // Import fs module
const path = require('path'); // Import path module
const { faker } = require('@faker-js/faker'); // Import faker for generating dummy data
const { genSalt, hash } = require('bcryptjs'); // Import bcryptjs for password hashing

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [];

    // Define the path for the password log file
    const passwordLogPath = path.join(
      __dirname,
      'passwords.log'
    );

    // Check if the password log file exists, and clean it if it does
    if (fs.existsSync(passwordLogPath)) {
      fs.truncateSync(passwordLogPath, 0); // This empties the file
    }

    const passwordLogStream = fs.createWriteStream(
      passwordLogPath,
      { flags: 'a' }
    ); // Open in append mode

    for (let i = 0; i < 20; i++) {
      const plainPassword = faker.internet.password(
        8,
        true,
        /^(?=.*[a-z])(?=.*[A-Z]).+$/
      );

      const username = faker.internet.userName();

      // Log the username and password to the file
      passwordLogStream.write(
        `Username: ${username}, Password: ${plainPassword}\n`
      );

      const salt = await genSalt(12); // Increase salt length for security.
      const encryptedPassword = await hash(
        plainPassword,
        salt
      );

      users.push({
        username,
        email: faker.internet.email(),
        password: encryptedPassword,
        biography: faker.lorem.paragraph(),
        photo: faker.image.avatar(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // Close the stream after all users are generated
    passwordLogStream.end();

    await queryInterface.bulkInsert('users', users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
