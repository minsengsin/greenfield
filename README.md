# Voluntinder

Voluntinder is a platform which tries to pair altruistic, good natured people with some extra time to kill, and volunteering oportunities nearby.

## Getting Started

* Take a look at the project structure.
  * Notice that the client and the server have their own folders.
  * They also have their own `package.json` files and `node_modules` folders. These `package.json` files are used only for their `scripts` fields.
  * The `package.json` in the root specifies all dependencies of the server and client.
* Run `yarn install`
  * `yarn` is a drop-in replacement for `npm`. Almost all of the commands are the same. Heroku supports both natively. If you are married to `npm`, simply remove the three `yarn.lock` files and run `npm install`. Be sure to add and commit the `package-lock.json` files.
  * If you are not using `yarn`, install in with `brew install yarn` (for macOS).
* Run `yarn run dev`.
  * Looking at the `scripts` field in `package.json`, we can see this starts the sql server in the background, then executes a command called `concurrently`. This command is installed along with the other dependencies in `yarn install`. It allows you to run any number of other commands with a node process printing the output for each to the same terminal.
  * Shortly after running, your browser should open with the website displaying.
  * We used `create-react-app` to generate the boilerplate for the client, and `react-scripts` to develop and build. [Read this guide](https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/) for more about the setup.

## Development

### Stack

* Client
  * `react-scripts`
  * `create-react-app`
  * `webpack`
* Server
  * Express
* Database
  * MySQL
  * Sequalize

### Client

* `react-scripts` uses webpack hot reloading, so just edit and watch the terminal or browser for errors.
* We used semantic-ui for css styling. It is included as a script tag in `index.html`. We did not use the component library `semantic-ui-react`, and instead just styled using `className` to set the css classes.
* The client runs at `localhost:3000`, and proxies relative requests (that is, API requests which do not begin with a domain, like `axios.get('/api/v3/users')`) to the server, which is running at `localhost:3001`. You do not need to know anything about this for it to "Just Work". I just wanted to make sure you knew it was happening. You can read about what's going on in the blog post linked above. [Linked here for convenience.](https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/)

### Server

* Server supports hot reloading via `nodemon`.
* Express v4 with Sequalize for the ORM and mysql for the database.
* Database files include calls to populate the database with dummy user and company data.
