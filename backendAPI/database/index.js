'use strict';
const Sequelize = require('sequelize');
const Users = require('../models/Users');
const Addresses = require('../models/Addresses');
const Plans = require('../models/Plans');
const dbConfig = new Sequelize(require('./config/db'));

Users.init(dbConfig);
Plans.init(dbConfig);
Addresses.init(dbConfig);
Users.associate(dbConfig.models);
Plans.associate(dbConfig.models);
Addresses.associate(dbConfig.models);
