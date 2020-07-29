'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.createTable('Plans', {
        id: {
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false
        },
        plan: {
            type:Sequelize.STRING,
            allowNull:false
        },
        createdAt: {
            type:Sequelize.DATE,
            allowNull:false
        },
        updatedAt: {
            type:Sequelize.DATE,
            allowNull:false
        },
    });
  },
  

  down: async (queryInterface, Sequelize) => {
     await queryInterface.dropTable('Plans');
  }
};
