const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        score: { type: DataTypes.INTEGER, allowNull: false },
        created: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
        updated: { type: DataTypes.DATE },
    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false,       
    };

    return sequelize.define('scoreboard', attributes, options);
}