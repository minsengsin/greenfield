const Sequelize = require('sequelize');
const DB_URL = process.env.JAWSDB_URL || 'mysql://root@localhost/greenfield';
const db = new Sequelize(DB_URL);

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
    description: Sequelize.STRING(1234),
    location: Sequelize.STRING,
    time: Sequelize.STRING
})

Task.belongsTo(User)

db.sync({force: true}).then(()=>{

    User.create({username: 'Fred Volunteer', password: 'Fred'});
    User.create({username: 'Amy Volunteer', password: 'Amy'});
    User.create({username: 'Oscar Volunteer', password: 'Oscar'});
    User.create({username: 'Bill Volunteer', password: 'Bill'});
    User.create({username: 'Stacy Volunteer', password: 'Stacy'});

    Organization.create({name: 'Salvation Army', bio: 'Organization Bio 1', site: 'Organization Site 1', contact: 'Organizational Contact 1'})
    Organization.create({name: 'GLAAD', bio: 'Organization Bio 2', site: 'Organization Site 2', contact: 'Organizational Contact 2'})
    Organization.create({name: 'International Womens Health Coalition', bio: 'Organization Bio 3', site: 'Organization Site 3', contact: 'Organizational Contact 3'})
    Organization.create({name: 'Human Rights Watch', bio: 'Organization Bio 4', site: 'Organization Site 4', contact: 'Organizational Contact 4'})
    Organization.create({name: 'Doctors Without Borders',  bio: 'Organization Bio 5', site: 'Organization Site 5', contact: 'Organizational Contact 5'})

    Task.create({date: '3/1/2018', description:'When I first brought my cat home from the Humane Society she was a mangy, pitiful animal. She was so thin that you could count her vertebrae just by looking at her. Apparently she was declawed by her previous owners, then abandoned or lost. Since she couldnt hunt, she nearly starved. Not only that, but she had an abscess on one hip. The vets at the Humane Society had drained it, but it was still scabby and without fur. She had a terrible cold, too. She was sneezing and sniffling and her meow was just a hoarse squeak. And shed lost half her tail somewhere. Instead of tapering gracefully, it had a bony knob at the end.', location: 'Task location 1', time: '12:00pm'})
    Task.create({date: '3/1/2018', description:'A paragraph is a series of sentences that are organized and coherent, and are all related to a single topic. Almost every piece of writing you do that is longer than a few sentences should be organized into paragraphs. This is because paragraphs show a reader where the subdivisions of an essay begin and end, and thus help the reader see the organization of the essay and grasp its main points.', location: 'Task location 2', time: '1:00pm'})
    Task.create({date: '3/1/2018', description:'Paragraphs can contain many different kinds of information. A paragraph could contain a series of brief examples or a single long illustration of a general point. It might describe a place, character, or process; narrate a series of events; compare or contrast two or more things; classify items into categories; or describe causes and effects. Regardless of the kind of information they contain, all paragraphs share certain characteristics. One of the most important of these is a topic sentence.', location: 'Task location 3', time: '2:00pm'})
    Task.create({date: '3/1/2018', description:'Although most paragraphs should have a topic sentence, there are a few situations when a paragraph might not need a topic sentence. For example, you might be able to omit a topic sentence in a paragraph that narrates a series of events, if a paragraph continues developing an idea that you introduced (with a topic sentence) in the previous paragraph, or if all the sentences and details in a paragraph clearly refer—perhaps indirectly—to a main point. The vast majority of your paragraphs, however, should have a topic sentence.', location: 'Task location 4', time: '3:00pm'})
    Task.create({date: '3/1/2018', description:'Most paragraphs in an essay have a three-part structure—introduction, body, and conclusion. You can see this structure in paragraphs whether they are narrating, describing, comparing, contrasting, or analyzing information. Each part of the paragraph plays an important role in communicating your meaning to your reader.', location: 'Task location 5', time: '4:00pm'})

})

exports.db = db;
exports.User = User;
exports.Task = Task;
exports.Organization = Organization;
