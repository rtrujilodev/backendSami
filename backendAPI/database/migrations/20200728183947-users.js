'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.createTable('Users', {
         id: {
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false
        },
         planId: {
            type:Sequelize.INTEGER,
            references: { model:'Plans', key:'id' },
            allowNull:false,
            onUpdate:'NO ACTION',
            onDelete:'NO ACTION'
        },
         name: {
            type:Sequelize.STRING,
            allowNull:false
        },
         RG: {
            type:Sequelize.INTEGER,
            allowNull:false
        },
         CPF: {
            type:Sequelize.BIGINT,
            allowNull:false
        },
         birthDate: {
            type:Sequelize.DATE,
            allowNull:false
        },
         dependents: {
            type:Sequelize.INTEGER
        },
         email: {
            type:Sequelize.STRING,
            allowNull:false
        },
         password: {
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
     await queryInterface.dropTable('Users');
  }
};
