'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('sample_model',{
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
      },
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      }
   })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('sample_model')
  }
};
