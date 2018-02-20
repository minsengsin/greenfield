const Sequelize = require('sequelize'); 
const db = new Sequelize('greenfied', 'root', null, {
    host: 'localhost',
    dialect: 'mysql' | 'postgres'
});

const User = db.define('User', {
    username: Sequelize.STRING, 
    password: Sequelize.STRING 
})

const Task = db.define('Task', { 
    date: Sequelize.STRING,
    description: Sequelize.STRING,
    location: Sequlize.STRING,
})

Task.hasOne(Organization)

const Organization =db.define('Organization', {
    name: Sequelize.STRING, 
    bio: Sequelize.STRING,
    contact: Sequelize.INTEGER  
})


