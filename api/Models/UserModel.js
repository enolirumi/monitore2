import { Sequelize, DataTypes } from "sequelize";
import database from '../services/db.js'

const User = database.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(2000),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(2000),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(2000),
        allowNull: false
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
})

export default User