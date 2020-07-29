const { Model, DataTypes } = require('sequelize');

class Users extends Model {
    static init(sequelize) {
        super.init({
            name:DataTypes.STRING,
            email:DataTypes.STRING,
            RG:DataTypes.INTEGER,
            CPF:DataTypes.INTEGER,
            birthDate:DataTypes.DATE,
            dependents:DataTypes.INTEGER,
            password:DataTypes.STRING
        }, {
            sequelize
        });
    }
    static associate(models) {
        this.belongsTo(models.Plans, { foreignKey:'planId', as:'plan' });
        this.hasMany(models.Addresses, { foreignKey:'usersId', as:'addresses' });
    }
}

module.exports = Users;
