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
    site: Sequelize.STRING,
    location: Sequelize.STRING,
    latitude: Sequelize.FLOAT,
    longitude: Sequelize.FLOAT,
    contact: Sequelize.STRING  
})

const Task = db.define('Tasks', { 
    date: Sequelize.DATE,
    title: Sequelize.STRING,
    description: Sequelize.STRING(1234),
    time: Sequelize.STRING
})

Task.belongsTo(User)


db.sync({force: true}).then(()=>{
    
    User.create({username: 'Fred Volunteer', password: 'Fred'});
    User.create({username: 'Amy Volunteer', password: 'Amy'});
    User.create({username: 'Oscar Volunteer', password: 'Oscar'});
    User.create({username: 'Bill Volunteer', password: 'Bill'});
    User.create({username: 'Stacy Volunteer', password: 'Stacy'});

    Organization.create({name: 'Salvation Army', bio: 'Organization Bio 1', site: 'salvationarmyusa.org', location: '208 8th Ave, New York, NY 10011', latitude: 40.743695, longitude: -73.999210, contact: '(212) 929-5214'})
    Organization.create({name: 'GLAAD', bio: 'Organization Bio 2', site: 'glaad.org', location: '104 W 29th St #4, New York, NY 10001', latitude: 40.746743, longitude: -73.990767, contact: '(212)629-3322'})
    Organization.create({name: 'International Womens Health Coalition', bio: 'Organization Bio 3', site: 'iwhc.org', location: '333 7th Ave #601, New York, NY 10001', latitude: 40.747449, longitude: -73.992823, contact: '(212)979-8500'})
    Organization.create({name: 'Human Rights Watch', bio: 'Organization Bio 4', site: 'hrw.org', location: '350 5th Ave #34th, New York, NY 10118', latitude: 40.748563, longitude: -73.985746, contact: '(212)290-4700'})
    Organization.create({name: 'NYC Cares',  bio: 'Organization Bio 5', site: 'newyorkcares.org', location: '214 W 29th St, New York, NY 10001', latitude: 40.748104, longitude: -73.993922, contact: '(212)228-5000'})

    Task.create({date: '3/1/2018', title: 'Task Title 1', description:'When I first brought my cat home from the Salvation Army she was a mangy, pitiful animal. She was so thin that you could count her vertebrae just by looking at her. Apparently she was declawed by her previous owners, then abandoned or lost. Since she couldnt hunt, she nearly starved. Not only that, but she had an abscess on one hip. The vets at the Humane Society had drained it, but it was still scabby and without fur. She had a terrible cold, too. She was sneezing and sniffling and her meow was just a hoarse squeak. And shed lost half her tail somewhere. Instead of tapering gracefully, it had a bony knob at the end.', time: '12:00pm'})
    Task.create({date: '3/1/2018', title: 'Answering Phones', description:'A paragraph is a series of sentences that are organized and coherent, and are all related to a single topic. Almost every piece of writing you do that is longer than a few sentences should be organized into paragraphs. This is because paragraphs show a reader where the subdivisions of an essay begin and end, and thus help the reader see the organization of the essay and grasp its main points.', time: '1:00pm'})
    Task.create({date: '3/1/2018', title: 'Canvassing', description:'Paragraphs can contain many different kinds of information. A paragraph could contain a series of brief examples or a single long illustration of a general point. It might describe a place, character, or process; narrate a series of events; compare or contrast two or more things; classify items into categories; or describe causes and effects. Regardless of the kind of information they contain, all paragraphs share certain characteristics. One of the most important of these is a topic sentence.', time: '2:00pm'})
    Task.create({date: '3/1/2018', title: 'Task Title 4', description:'Although most paragraphs should have a topic sentence, there are a few situations when a paragraph might not need a topic sentence. For example, you might be able to omit a topic sentence in a paragraph that narrates a series of events, if a paragraph continues developing an idea that you introduced (with a topic sentence) in the previous paragraph, or if all the sentences and details in a paragraph clearly refer—perhaps indirectly—to a main point. The vast majority of your paragraphs, however, should have a topic sentence.', time: '3:00pm'})
    Task.create({date: '3/1/2018', title: 'Task Title 5', description:'Most paragraphs in an essay have a three-part structure—introduction, body, and conclusion. You can see this structure in paragraphs whether they are narrating, describing, comparing, contrasting, or analyzing information. Each part of the paragraph plays an important role in communicating your meaning to your reader.', time: '4:00pm'})
})


exports.User = User;
exports.Task = Task;
exports.Organization = Organization;