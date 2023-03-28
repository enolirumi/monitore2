// Usuario.hasMany(refeicoes)
//PAROU AQ

import { Sequelize, DataTypes } from "sequelize";
import database from '../services/db.js'

const Snack = database.define('snack', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    
})

export default User