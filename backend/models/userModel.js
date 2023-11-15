import sequelize from 'sequelize';
import db from '../config/database.js';

const { DataTypes } = sequelize;

// Create Table
const Users = db.define('users', {
  name: {type: DataTypes.STRING},
  email: {type: DataTypes.STRING},
  password: {type: DataTypes.STRING},
  refresh_token: {type: DataTypes.TEXT}
}, 
{
  freezeTableName: true 
});

export default Users;