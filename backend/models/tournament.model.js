const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        name: { type: DataTypes.STRING, allowNull: false },
        discipline: { type: DataTypes.STRING, allowNull: false },
        time: { type: DataTypes.DATE, allowNull: false },
        googleMaps: { type: DataTypes.STRING, allowNull: false },
        maxParticipants: { type: DataTypes.INTEGER, allowNull: false },
        applicationDeadline: { type: DataTypes.DATE, allowNull: false },
        nrRankedPlayers: { type: DataTypes.INTEGER, allowNull: false },
        created: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
        updated: { type: DataTypes.DATE },
    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false,       
    };

    return sequelize.define('tournament', attributes, options);
}