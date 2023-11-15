import { Sequelize } from 'sequelize';

// Connect to database
const db = new Sequelize('auth_db', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
})

export default db;