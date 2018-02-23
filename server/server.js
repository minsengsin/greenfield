const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const db = require('./database/models.js').db;
const { User, Task, UserTasks, Organization } = require('./database/models.js');
const session = require('express-session');


let app = express();

app.use(session({
  secret: 'team lyly',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 600000,
    secure: false
  }
  
}));

const isLoggedIn = function (req) {
  return req.session ? !!req.session.user : false;
}

const isAuthorized = function (req, res, next) {
  if (!isLoggedIn(req)) {
    res.redirect('/login');
  } else {
    next();
  }
}


// Parse JSON (uniform resource locators)
app.use(bodyParser.json());
// Parse forms as well
app.use(bodyParser.urlencoded({ extended: true }));

// Declare static files
app.use(express.static(__dirname + '/../client/build'));

// ROUTES --------------------------------------------------

// Should authenticate a user, creating a session token and assigning it
// to this user.

app.post('/login', function(req, res) {
    User.find({
      where: {
        username: req.body.username,
      }
    }).then((e)=>{
      if (e.dataValues && e.dataValues.password === req.body.password) {
        req.session.regenerate(function(){
          req.session.user = e.dataValues.username
          res.redirect('/demo')
          // res.end(req.body.username)
        })
      } else {
        res.redirect('/login')
      }
    })
});

app.post('/username', function(req, res){
  let name = req.session.user
  res.end(name)
})

app.get('/destroySession', function(req, res) {
console.log('before destroy this is session', req.session)
  if(req.session){
    req.session.destroy()
  } else {
    res.end()
  }
console.log('after destroy this is session', req.session)
 
})

app.get('/status', function(req, res) {
  if(req.session.user){
    // req.session.destroy()
    // req.logout()
    res.send(true)
  } else {
    res.send(false)
  }
})

app.post('/signup', function (req, res) {
  User.find({
    where: {
      username: req.body.username,
    }
  }).then((e) => {
    if (e && e.dataValues.username === req.body.username) {
      res.redirect('/signup')
    } else {
      User.create({
        username: req.body.username,
        password: req.body.password
      }).then(() => { res.redirect('/login') })
    }
  })
});

// Returns a list of all users from the database.
app.get('/users', function (req, res) {
  User.all().then(results => {
    console.log(results);
  });
});

// Returns array of Tasks ID from database by userID.
app.get('/users/:username', function (req, res) {
  User.find({
    where: {
      username: req.params.username
    }
  }).then((data) => { //data is object of that user with 'id' key
    UserTasks.findAll({
      where: {
        UserId: data.dataValues.id
      }
    }).then((data) => { // data is array of objects with property each 'TaskId'
      var arrayOfTasks = [];
      data.map((task) => {
        arrayOfTasks.push(task.dataValues.TaskId)
      })
      console.log(arrayOfTasks)
      res.send(arrayOfTasks)
    })
  })

});

// Returns all tasks from the database.
app.get('/tasks', function (req, res) {
  Task.all().then(results => {
    res.send(results);
  });
});

// Expects JSON containing all information necessary to create and
// save a new task object to the database.
app.post('/tasks', function (req, res) {
  // TODO: Need UserId for Task object creation, acquired from session.
  const { date, description, location, time } = req.body;
  Task.create({ date, description, location, time }).then(results => {
    res.status(201).send(`Created new task`);
  });
});

// Returns information for a single task.
app.get('/tasks/:taskId', function (req, res) {
  Task.find({
    where: {
      id: req.params.taskId,
    },
  })
    .then(result => {
      // If task not found ...
      if (!result) {
        res.status(404).send(`Task with taskId ${req.params.taskId} not found`);
      } else {
        res.send(result);
      }
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

// Assign the :taskId task to the current user. Triggered when a user
// accepts/applies to a task.
app.post('/tasks/:taskId/accept', function(req, res) {
  console.log("--------", req.session.user.toString() + '')
  User.find({
    where: {
      username: req.session.user
    }
  }).then((data)=> {
    var UserID = data.dataValues.id.toString();
    var TaskID = req.params.taskId.toString();
    console.log('IDS---',data.dataValues)
    UserTasks.find({
      where: {
        UserId: UserID,
        TaskId: TaskID
      }
    }).then((data) => {
      if (data === null) {
        UserTasks.create({UserId: UserID, TaskId: TaskID }).then(()=>{
          res.send("Task is added")
        }).catch((err)=>{console.log(err)})
      }
    })
  })
});


app.post('/tasks/:taskId/reject', function(req, res) {
  var UserName = req.session.user.toString();
  var TaskID = req.params.taskId.toString();
  console.log('------', req.session.user)
  User.find({
    where: {
      username: UserName
    }
  }).then((data) => {
    UserTasks.find({
      where: {
        UserId: data.dataValues.id,
        TaskId: TaskID
      }
    }).then((data) => {
      console.log('about to destroy it')
      return UserTasks.destroy({
        where: {
          id: data.dataValues.id
        }
      })
      console.log('just destroyed it')
    }).then((data) => {
      console.log('we are hopefully about to redirect but lets seee', data)
        res.send("SHOULD REDIRECT")

    })

  })

})


let port = process.env.PORT || 3001;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});
