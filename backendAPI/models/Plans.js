const { Model, DataTypes } = require('sequelize');

class Plans extends Model {
    static init(sequelize) {
        super.init({
         plan:DataTypes.STRING
        }, {
            sequelize
        });
    }
    static associate(models) {
        this.hasOne(models.Users, { foreignKey:'planId', as:'user_plan' });
    }
}

module.exports = Plans;
