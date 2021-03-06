const Sequelize = require('sequelize');
const DB_URL = process.env.JAWSDB_URL || 'mysql://root@localhost/greenfield';
const db = new Sequelize(DB_URL);

const User = db.define('Users', {
    username: Sequelize.STRING,
    password: Sequelize.STRING
})

const Organization = db.define('Organizations', {
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    name: Sequelize.STRING,
    bio: Sequelize.STRING(1234),
    site: Sequelize.STRING,
    location: Sequelize.STRING,
    latitude: Sequelize.FLOAT,
    longitude: Sequelize.FLOAT,
    contact: Sequelize.STRING
})

const Task = db.define('Tasks', {
    date: Sequelize.STRING,
    title: Sequelize.STRING,
    description: Sequelize.STRING(1234),
    organization: Sequelize.STRING,
    time: Sequelize.STRING,
    latitude: Sequelize.FLOAT,
    longitude: Sequelize.FLOAT,
    location: Sequelize.STRING
})

// Task.belongsTo(User)


const UserTasks = db.define('userTasks', {
    UserId: Sequelize.STRING,
    TaskId: Sequelize.STRING
})





db.sync({force: true}).then(()=>{
    User.create({username: 'FredVolunteer', password: 'Fred'});
    User.create({username: 'AmyVolunteer', password: 'Amy'});
    User.create({username: 'OscarVolunteer', password: 'Oscar'});
    User.create({username: 'BillVolunteer', password: 'Bill'});
    User.create({username: 'StacyVolunteer', password: 'Stacy'});

    Organization.create({username: 'SalvationArmy', password: 'SalvationArmy', name: 'Salvation Army', bio: 'We are the Greater New York Division of The Salvation Army, and for over 130 years, we\'ve dedicated ourselves to doing the most good for the men, women and children in our area who need it most.', site: 'salvationarmyusa.org', location: '208 8th Ave, New York, NY 10011', latitude: 40.743695, longitude: -73.999210, contact: '(212) 929-5214'})
    Organization.create({username: 'GLAAD', password: 'GLAAD', name: 'GLAAD', bio: 'GLAAD rewrites the script for LGBTQ acceptance. As a dynamic media force, GLAAD tackles tough issues to shape the narrative and provoke dialogue that leads to cultural change. GLAAD protects all that has been accomplished and creates a world where everyone can live the life they love.', site: 'glaad.org', location: '104 W 29th St #4, New York, NY 10001', latitude: 40.746743, longitude: -73.990767, contact: '(212)629-3322'})
    Organization.create({username: 'IWHC', password: 'IWHC', name: 'International Womens Health Coalition', bio: 'Since 1984, the International Women’s Health Coalition has taken courageous stands and achieved political victories for women and girls globally and in local communities.', site: 'iwhc.org', location: '333 7th Ave #601, New York, NY 10001', latitude: 40.747449, longitude: -73.992823, contact: '(212)979-8500'})
    Organization.create({username: 'HRW', password: 'HRW', name: 'Human Rights Watch', bio: 'Human Rights Watch is a nonprofit, nongovernmental human rights organization made up of roughly 400 staff members around the globe.  Established in 1978, Human Rights Watch is known for its accurate fact-finding, impartial reporting, effective use of media, and targeted advocacy, often in partnership with local human rights groups.', site: 'hrw.org', location: '350 5th Ave #34th, New York, NY 10118', latitude: 40.748563, longitude: -73.985746, contact: '(212)290-4700'})
    Organization.create({username: 'NYCares', password: 'NYCares', name: 'NYCares',  bio: 'New York Cares is a nonprofit organization focused on volunteer management and was founded by a group of New York residents in 1987 who wanted to take action against social issues in New York City.', site: 'newyorkcares.org', location: '214 W 29th St, New York, NY 10001', latitude: 40.748104, longitude: -73.993922, contact: '(212)228-5000'})

    Task.create({date: '3/1/2018', title: 'Processing Donations', description:'Accepting physical donations of clothes, dry goods, and housewares, sorting each one for future examination and pricing by our management staff.', organization: 'Salvation Army', time: '12:00pm', latitude: 40.743695, longitude: -73.999210, location: '208 8th Ave, New York, NY 10011'})
    Task.create({date: '3/1/2018', title: 'Answering Phones', description:'Serving at our inbound call center to answer questions, field press inquiries, and route donations to the lines of our paid staffers.', organization: 'GLAAD', time: '1:00pm', latitude: 40.746743, longitude: -73.990767, location: '104 W 29th St #4, New York, NY 10001'})
    Task.create({date: '3/1/2018', title: 'Canvassing', description:'Door-to-door fundraising and brand-building in pre-confirmed target neighborhoods throughout each of the five boroughs.', organization: 'International Womens Health Coalition', time: '2:00pm', latitude: 40.747449, longitude: -73.992823, location: '333 7th Ave #601, New York, NY 10001'})
    Task.create({date: '3/1/2018', title: 'Mail Sorting', description:'Route internal and external correspondence from the mailroom of our charter location in the heart of New York City.', organization: 'Human Rights Watch', time: '3:00pm', latitude: 40.748563, longitude: -73.985746, location: '350 5th Ave #34, New York, NY 10118'})
    Task.create({date: '3/1/2018', title: 'Event Usher', description:'Seat participants and field questions from guests at our annual fundraising drive.', time: '4:00pm', organization: 'NYCares', latitude: 40.748104, longitude: -73.993922, location: '214 W 29th St, New York, NY 10001'})
    
    UserTasks.create({UserId:'1', TaskId: '3'})
    UserTasks.create({UserId:'1', TaskId: '4'})
    UserTasks.create({UserId:'3', TaskId: '4'})
    UserTasks.create({UserId:'3', TaskId: '5'})
    UserTasks.create({UserId:'1', TaskId: '5'})
 
    UserTasks.create({UserId:'2', TaskId: '1'})
    UserTasks.create({UserId:'2', TaskId: '2'})
 
 })
 
 exports.User = User;
 exports.Task = Task;
 exports.UserTasks = UserTasks;
 exports.Organization = Organization;
