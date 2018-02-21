const Sequelize = require('sequelize'); 

const db = new Sequelize('greenfield', 'root', null, {
    host: 'localhost',
    dialect: 'mysql'
});

const User = db.define('Users', {
    username: Sequelize.STRING, 
    password: Sequelize.STRING 
})

const Organization = db.define('Organizations', {
    name: Sequelize.STRING, 
    bio: Sequelize.STRING,
    contact: Sequelize.INTEGER  
})

const Task = db.define('Tasks', { 
    date: Sequelize.STRING,
    description: Sequelize.STRING,
    location: Sequelize.STRING
})

Task.belongsTo(User)


db.sync({force: true})


exports.User = User;
exports.Task = Task;
exports.Organization = Organization;