const { Model, DataTypes } = require('sequelize');

class Addresses extends Model {
    static init(sequelize) {
        super.init({
         street:DataTypes.STRING,
         zipcode:DataTypes.STRING,
         number:DataTypes.INTEGER,
         neighborhood:DataTypes.STRING,
         city:DataTypes.STRING,
         state:DataTypes.STRING
        }, {
            sequelize
        });
    }
    static associate(models) {
        this.belongsTo(models.Users, { foreignKey:'usersId', as:'user_addresses' });
    }
}

module.exports = Addresses;
