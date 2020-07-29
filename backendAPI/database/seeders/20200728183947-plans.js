'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Plans', [{
        plan:'Basic',
        createdAt: new Date(),
        updatedAt: new Date()
     },{
        plan:'Standard',
        createdAt: new Date(),
        updatedAt: new Date()
    },{
        plan:'Premium',
        createdAt: new Date(),
        updatedAt: new Date()        
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Plans', null, {});
  }
};
