const connection = require('../config/connection');

const User = connection.sequelize.define('db_users',{
    id: {
        type: connection.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: connection.Sequelize.STRING,
        allowNull: false
    },
    email:{
        type: connection.Sequelize.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type: connection.Sequelize.STRING,
        allowNull:false
    }
    })
User.sync();
module.exports = User;