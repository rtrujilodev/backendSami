'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Addresses', [{
        usersId:1,
        street:'Rua teste AB',
        zipcode:'01010-010',
        number:180,
        neighborhood:'teste bairro',
        city:'teste city',
        state:'teste state',
        createdAt: new Date(),
        updatedAt: new Date()
     },{
        usersId:2,
        street:'Rua alegre',
        zipcode:'09550-250',
        number:559,
        neighborhood:'Barcelona',
        city:'São Caetano do Sul',
        state:'São Paulo',
        createdAt: new Date(),
        updatedAt: new Date()
     },{
        usersId:3,
        street:'Rua XY',
        zipcode:'12345-678',
        number:720,
        neighborhood:'teste bairro',
        city:'teste city',
        state:'teste state',
        createdAt: new Date(),
        updatedAt: new Date()
     }], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Addresses', null, {});
  }
};
