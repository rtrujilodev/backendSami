'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
        name: 'John Doe',
        email: 'john.doe@transactsql.com',
        RG: 123456789,
        CPF: 12345678911,
        birthDate: new Date('01/01/1955'),
        dependents:2,
        planId:1,
        password: await bcrypt.hash('3ncryptm3', 10),
        createdAt: new Date(),
        updatedAt: new Date()
     },{
        name: 'Rodrigo Trujilo',
        email: 'rtrujilo.dev@gmail.com',
        RG: 335181570,
        CPF: 31971463876,
        birthDate: new Date('08/06/1982'),
        planId:2,
        password: await bcrypt.hash('b1nary', 10),
        createdAt: new Date(),
        updatedAt: new Date()
     },{
        name: 'Robert',
        email: 'robert@transactsql.com',
        RG: 987654321,
        CPF: 11987654321,
        birthDate: new Date('01/01/1955'),
        dependents:1,
        planId:3,
        password: await bcrypt.hash('c0d3m0rs3', 10),
        createdAt: new Date(),
        updatedAt: new Date()
     }], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Users', null, {});
  }
};
