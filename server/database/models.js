const Sequelize = require('sequelize');
const DB_URL = process.env.JAWSDB_URL || 'mysql://root@localhost/greenfield';
const db = new Sequelize(DB_URL);

const User = db.define('Users', {
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    zip: Sequelize.STRING
});

const UserTaskDist = db.define('UserTaskDist', {
  userId: Sequelize.INTEGER,
  taskId: Sequelize.INTEGER,
  distance: Sequelize.INTEGER
});

//
const Organization = db.define('Organizations', {
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    name: Sequelize.STRING,
    bio: Sequelize.STRING(1234),
    site: Sequelize.STRING,
    location: Sequelize.STRING,
    contact: Sequelize.STRING
});

const UserOrg = db.define('UserOrg', {
  userId: Sequelize.INTEGER,
  orgId: Sequelize.INTEGER
});

const Task = db.define('Tasks', {
    organization: Sequelize.STRING,
    title: Sequelize.STRING,
    description: Sequelize.STRING(750),
    location: Sequelize.STRING,
    zip: Sequelize.STRING,
    latitude: Sequelize.FLOAT,
    longitude: Sequelize.FLOAT,
    needed: Sequelize.INTEGER,
    volunteers: Sequelize.INTEGER,
    completed: {type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false},
    date: Sequelize.STRING(25),
})

// Task.belongsTo(User)


const UserTasks = db.define('userTasks', {
    UserId: Sequelize.STRING,
    TaskId: Sequelize.STRING,
    completed: {type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false}
});

db.sync({force: true}).then(()=>{
    User.create({username: 'FredVolunteer', password: 'Fred'});
    User.create({username: 'AmyVolunteer', password: 'Amy'});
    User.create({username: 'OscarVolunteer', password: 'Oscar'});
    User.create({username: 'BillVolunteer', password: 'Bill'});
    User.create({username: 'StacyVolunteer', password: 'Stacy'});
    User.create({username: 'a', password: 'a'});

    Organization.create({username: 'Salvation Army', password: 'Salvation Army', name: 'Salvation Army', bio: 'We are the Greater New York Division of The Salvation Army, and for over 130 years, we\'ve dedicated ourselves to doing the most good for the men, women and children in our area who need it most.', site: 'salvationarmyusa.org', location: '208 8th Ave, New York, NY 10011', latitude: 40.743695, longitude: -73.999210, contact: '(212) 929-5214'})
    Organization.create({username: 'GLAAD', password: 'GLAAD', name: 'GLAAD', bio: 'GLAAD rewrites the script for LGBTQ acceptance. As a dynamic media force, GLAAD tackles tough issues to shape the narrative and provoke dialogue that leads to cultural change. GLAAD protects all that has been accomplished and creates a world where everyone can live the life they love.', site: 'glaad.org', location: '104 W 29th St #4, New York, NY 10001', latitude: 40.746743, longitude: -73.990767, contact: '(212)629-3322'})
    Organization.create({username: 'IWHC', password: 'IWHC', name: 'International Womens Health Coalition', bio: 'Since 1984, the International Women’s Health Coalition has taken courageous stands and achieved political victories for women and girls globally and in local communities.', site: 'iwhc.org', location: '333 7th Ave #601, New York, NY 10001', latitude: 40.747449, longitude: -73.992823, contact: '(212)979-8500'})
    Organization.create({username: 'HRW', password: 'HRW', name: 'Human Rights Watch', bio: 'Human Rights Watch is a nonprofit, nongovernmental human rights organization made up of roughly 400 staff members around the globe.  Established in 1978, Human Rights Watch is known for its accurate fact-finding, impartial reporting, effective use of media, and targeted advocacy, often in partnership with local human rights groups.', site: 'hrw.org', location: '350 5th Ave #34th, New York, NY 10118', latitude: 40.748563, longitude: -73.985746, contact: '(212)290-4700'})
    Organization.create({username: 'NYCares', password: 'NYCares', name: 'NYCares',  bio: 'New York Cares is a nonprofit organization focused on volunteer management and was founded by a group of New York residents in 1987 who wanted to take action against social issues in New York City.', site: 'newyorkcares.org', location: '214 W 29th St, New York, NY 10001', latitude: 40.748104, longitude: -73.993922, contact: '(212)228-5000'})
    Organization.create({username: 'rory', password: 'eagan', name: 'rory fund', bio: 'we donate money to rory', site: 'roryeagan.com', location: 'Rorys house', contact: 'call rory'});
    Organization.create({username: 'bob', password: 'jones', name: 'bob fund', bio: 'we donate money to bob', site: 'bobjones.com', location: 'bobs house', contact: 'call bob'});
    //Organization.create({username: 'Samaritans of New York', password: '123', name: 'Samaritans of New York', bio: "The Samaritans of New York is the local branch of the world's oldest and largest volunteer crisis response network with 400 centers in 40 countries. Samaritans is devoted to helping people", site: "http://www.samaritansnyc.org", location: 'Madison Square Station New York, NY 10159', contact: 'call bob'});







    Task.create({title: 'Mail Sorting', description:'Route internal and external correspondence', organization: 'Human Rights Watch', latitude: 40.748563, longitude: -73.985746, location: '350 5th Ave #34, New York, NY 10118', needed: 10, volunteers: 0, date: '2018-01-01T12:00:00-05:00', zip: 91503})
    Task.create({title: 'Processing Donations', description:'Accepting physical donations of clothes.', organization: 'Salvation Army', latitude: 40.743695, longitude: -73.999210, location: '208 8th Ave, New York, NY 10011', needed: 10, volunteers: 9, date: '2018-01-01T12:00:00-05:00', zip: 10011})
    Task.create({title: 'Answering Phones', description:'Serving at our inbound call center.', organization: 'GLAAD', latitude: 40.746743, longitude: -73.990767, location: '104 W 29th St #4, New York, NY 10001', needed: 10, volunteers: 0, date: '2018-03-04T12:00:00-05:00', zip: 10001})
    Task.create({title: 'Canvassing', description:'Door-to-door fundraising', organization: 'International Womens Health Coalition', latitude: 40.747449, longitude: -73.992823, location: '333 7th Ave #601, New York, NY 10001', needed: 10, volunteers: 0, date: '2018-03-04T12:00:00-05:00', zip: 10001})
    Task.create({title: 'Mail Sorting', description:'Route internal and external correspondence', organization: 'Human Rights Watch', latitude: 40.748563, longitude: -73.985746, location: '350 5th Ave #34, New York, NY 10118', needed: 10, volunteers: 9, date: '2018-03-04T12:00:00-05:00', zip: 10118})
    Task.create({title: 'Set up city meeting', description:'Help the Mayor', organization: 'Samaritans of New York', latitude: 40.712775, longitude:  -74.005973, location: 'City Hall Park, New York, NY 10007', needed: 6, volunteers: 0, date: '2018-03-04T12:00:00-05:00', zip: 10007})
    Task.create({title: 'Wedding Clean Up', description:'Come clean up my wedding', organization: 'NYCares', latitude: 40.715203, longitude: -74.001880, location: '141 Worth St, New York, NY 10007', needed: 35, volunteers: 10, date: '2018-03-04T12:00:00-05:00', zip: 10007})
    Task.create({title: 'Wash Puppies', description:'Come wash the puppies', organization: 'NYCares', latitude: 40.721535, longitude: -74.004111, location: '307 W Broadway, New York, NY 10013', needed: 15, volunteers: 14, date: '2018-03-04T12:00:00-05:00', zip: 10013})
    Task.create({title: 'Walk Dogs', description:'The Dogs need walking, come out for a day of dog walking', organization: 'NYCares', latitude: 40.718814, longitude: -73.999061, location: '200 Centre St, New York, NY 10013', needed: 8, volunteers: 3, date: '2018-03-04T12:00:00-05:00', zip: 10013})
    Task.create({title: 'Serving food', description:'An afternoon of helping serve food', organization: 'NYCares', latitude: 40.759864, longitude: -73.988674, location: '308 W 46th St, New York, NY 10036', needed: 40, volunteers: 23, date: '2018-03-04T12:00:00-05:00', zip: 10036})
    Task.create({title: 'Prepping Food at Soup Kitchen', description:'Spend an afternoon helping us prep food for people experiencing homelessness', organization: 'NYCares', latitude: 40.745281, longitude: -73.981419, location: '120 E 32nd St, New York, NY 10016', needed: 30, volunteers: 9, date: '2018-03-04T12:00:00-05:00', zip: 10016})
    Task.create({title: 'Mentors Needed', description:'Tutor students and help them with homework', organization: 'NYCares', latitude: 40.747923, longitude: -73.975152, location: '225 E 38th St, New York, NY 10016', needed: 6, volunteers: 0, date: '2018-03-04T12:00:00-05:00', zip: 10016})
    Task.create({title: 'Jersey Soup Kitchen', description:'Come soup', organization: 'GLAAD', latitude: 40.740348, longitude: -74.031204, location: '300 Bloomfield St, Hoboken, NJ 07030', needed: 8, volunteers: 0, date: '2018-03-04T12:00:00-05:00', zip: 07030})
    Task.create({title: 'More Jersey Soup', description:'Jersey SOUP SOUP SOUP SOOOP', organization: 'NYCares', latitude: 40.718724, longitude: -74.052228, location: '420 Grand St, Jersey City, NJ 07302', needed: 6, volunteers: 5, date: '2018-03-04T12:00:00-05:00', zip: 07302})
    Task.create({title: 'Jersey Pancakes', description:'Come help make pancakes', organization: 'NYCares', latitude: 40.716705, longitude: -74.048602, location: '426 Jersey Ave, Jersey City, NJ 07302', needed: 30, volunteers: 29, date: '2018-03-04T12:00:00-05:00', zip: 07302})
    Task.create({title: 'Life is good', description:'come be a loft', organization: 'NYCares', latitude: 40.720551, longitude: -74.043771, location: '146 Newark Ave, Jersey City, NJ 07302', needed: 3, volunteers: 2, date: '2018-03-04T12:00:00-05:00', zip: 07302})
    Task.create({title: 'Diner life', description:'Come wash dishes', organization: 'GLAAD', latitude: 40.747923, longitude: -73.975152, location: '708 Jersey Ave, Jersey City, NJ 07302', needed: 6, volunteers: 0, date: '2018-03-04T12:00:00-05:00', zip: 07302})
    Task.create({title: 'DMV', description:'Come help the jersey DMV', organization: 'NYCares', latitude: 40.730566, longitude: -74.061159, location: '438 Summit Ave, Jersey City, NJ 07307', needed: 6, volunteers: 5, date: '2018-03-04T12:00:00-05:00', zip: 07307})
    Task.create({title: 'Brooklyn art show', description:'Come show off art', organization: 'Salvation Army', latitude: 40.704560, longitude: -73.916597, location: 'St Nicholas Ave, Brooklyn, NY 11237', needed: 6, volunteers: 0, date: '2018-03-04T12:00:00-05:00', zip: 11237})
    Task.create({title: 'Brooklyn Diner', description:'Come eat brooklyn food', organization: 'NYCares', latitude: 40.705081, longitude: -73.933571, location: '261 Moore St, Brooklyn, NY 11206', needed: 6, volunteers: 5, date: '2018-03-04T12:00:00-05:00', zip: 11206})
    Task.create({title: 'Museum of moving image', description:'Come help at the nice museum', organization: 'NYCares', latitude: 40.756345, longitude: -73.923950, location: '36-01 35th Ave, Queens, NY 11106', needed: 6, volunteers: 0, date: '2018-03-04T12:00:00-05:00', zip: 11106})




    // Task.create({title: 'Processing Donations', description:'Accepting physical donations of clothes, dry goods, and housewares, sorting each one for future examination and pricing by our management staff.', organization: 'Salvation Army', latitude: 40.743695, longitude: -73.999210, location: '208 8th Ave, New York, NY 10011', needed: 10, volunteers: 9, dateTime: '03-01-2018 12:00'})
    // Task.create({title: 'Answering Phones', description:'Serving at our inbound call center to answer questions, field press inquiries, and route donations to the lines of our paid staffers.', organization: 'GLAAD', latitude: 40.746743, longitude: -73.990767, location: '104 W 29th St #4, New York, NY 10001', needed: 10, volunteers: 0, dateTime: '03-02-2018 13:00'})
    // Task.create({title: 'Canvassing', description:'Door-to-door fundraising and brand-building in pre-confirmed target neighborhoods throughout each of the five boroughs.', organization: 'International Womens Health Coalition', latitude: 40.747449, longitude: -73.992823, location: '333 7th Ave #601, New York, NY 10001', needed: 10, volunteers: 0, dateTime: '03-03-2018 14:00'})
    // Task.create({title: 'Mail Sorting', description:'Route internal and external correspondence from the mailroom of our charter location in the heart of New York City.', organization: 'Human Rights Watch', latitude: 40.748563, longitude: -73.985746, location: '350 5th Ave #34, New York, NY 10118', needed: 10, volunteers: 0, dateTime: '03-04-2018 15:00'})
    // Task.create({title: 'Event Usher', description:'Seat participants and field questions from guests at our annual fundraising drive.', organization: 'NYCares', latitude: 40.748104, longitude: -73.993922, location: '214 W 29th St, New York, NY 10001', needed: 10, volunteers: 0, dateTime: '03-06-2018 17:00'})
//
    UserOrg.create({userId: '6', orgId: '1'});
    UserOrg.create({userId: '6', orgId: '6'});
    UserOrg.create({userId: '6', orgId: '7'});

    UserOrg.create({userId: '1', orgId: '2'});
    UserOrg.create({userId: '2', orgId: '3'});
    UserOrg.create({userId: '3', orgId: '4'});
    UserOrg.create({userId: '4', orgId: '5'});
    UserOrg.create({userId: '4', orgId: '6'});



 });

 exports.User = User;
 exports.Task = Task;
 exports.UserTasks = UserTasks;
 exports.Organization = Organization;
 exports.UserOrg = UserOrg;
 exports.UserTaskDist= UserTaskDist;
