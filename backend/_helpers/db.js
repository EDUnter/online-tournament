const config = require('config.json');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

module.exports = db = {};

initialize();

async function initialize() {
    // create db if it doesn't already exist
    const { host, port, user, password, database } = config.database;
    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // connect to db
    const sequelize = new Sequelize("mysql://b684deffec0f96:87d59613@eu-cdbr-west-02.cleardb.net/heroku_c71ec6e5f2a4c65");

    // init models and add them to the exported db object
    db.Account = require('../models/account.model')(sequelize);
    db.RefreshToken = require('../models/refresh-token.model')(sequelize);
    db.Tournament = require('../models/tournament.model')(sequelize);
    db.SponsorLogos = require('../models/sponsor-logo.model')(sequelize);
    db.Scoreboard = require('../models/scoreboard.model')(sequelize);

    // define relationships
    db.Account.hasMany(db.RefreshToken, { onDelete: 'CASCADE' });
    db.RefreshToken.belongsTo(db.Account);
    db.Account.hasMany(db.Tournament), { onDelete: 'CASCADE' };
    db.Tournament.belongsTo(db.Account);
    db.Tournament.hasMany(db.SponsorLogos, { onDelete: 'CASCADE' });
    db.SponsorLogos.belongsTo(db.Tournament);
    db.Scoreboard.belongsTo(db.Tournament);
    db.Tournament.hasMany(db.Scoreboard);
    db.Scoreboard.belongsTo(db.Account);
    db.Account.hasMany(db.Scoreboard);

    // sync all models with database
    await sequelize.sync();
}