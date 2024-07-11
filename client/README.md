# Simple Goals Tracker Application For Families
Welcome to this Goals Tracker App (simple version)!

This application is designed with families in mind and provides a way for parents to start training their pre-teen and teenage children how to set goals and work towards them wtih a group. Families can set overarching goals and build responsibility and accountability within their home by assigning contributing tasks to each family member. Two "views" are provided in this app to help you understand the goals overall and how each user fits into them: "Goals View" allows users to easily see each goal and assign tasks to users. "Team View" lets users view all their tasks in one place for easy reference.

This is a REACT and FLASK application. Data is stored in three tables: "users", "goals", and "tasks".

Are you ready to get started?

## Yes please! Let's get started!
Awesome! I'm so excited you will be using this app.
To get things up and running, do these steps:

1. **Fork** this app into your Github account.
2. **Copy** this app (Code -> SSH -> *copy*)
3. **Clone:** Open your Terminal and run ```$ git clone then_paste_your_copy_here``
4. **Install Dependencies For The Backend Code** by running these two commands:
    ```console
        pipenv install
        pipenv shell
    ```
5. **Start The App:** Run the following command in your terminal: 
    ```console
        python server/app.py
    ```
6. **Install Dependencies For The Frontend Code & Start The App:**
    ```console
        npm install
        npm start
    ```

This application stores your goals and tasks in the `app.db` file where you will find three tables: 

"goals" Table:
| id | gaol |
| ----------- | ----------- |
|id key - Integer | String |


"tasks" Table (the 'Join' Table):
| id | task | completed | goals_id  | users_id (foreign key) |
| ----------- | ----------- | ----------- | ----------- |  ----------- |
|id - Integer | String | Boolean | Corresponding goal id - Integer (foreign key) | Corresponding user id - Integer (foreign key)  |


"users" Table:
| id | username |
| ----------- | ----------- |
|id key - Integer | String |


### Tree:
In order to present cleaner code, the files have been broken into two major file: "server" (to house the server-side files) and "client" (to house the client-side files).
This is the project tree:
(files with * by them will be discussed below)
.
├── client *
│     └── src
│         ├── components *
│         │   ├── AddGoal.js *
│         │   ├── AddTask.js * 
│         │   ├── App.css *
│         │   ├── App.js *
│         │   ├── CompleteTask.js *
│         │   ├── CompletedCount.js *
│         │   ├── CreateNewUser.js *
│         │   ├── DeleteGoalTask.js *
│         │   ├── ErrorPage.js *
│         │   ├── GoalsView.js *
│         │   ├── ListUsers.js *
│         │   ├── NavBar.js *
│         │   ├── TeamView.js *
│         │   └── WelcomePage.js *
│         ├── index.css
│         ├── index.js *
│         └── routes.js *
└── server *
    ├── __pycache__
    ├── app.py *
    ├── config.py
    ├── instance
    │   └── app.db
    ├── migrations
    ├── models.py *
    └── seed.py *


#### App.js:
App.js is in charge of displaying different components based on what route is being rendered ('/' renders "WelcomePage", '/goals' renders "GoalsView", '/team' renders "TeamView"). useEffect fetches to '/' for all users, '/goals' for all goals, and '/tasks' for all tasks. 
App.js holds three state variables (userList, allGoals, and allTasks) which are passed down to child components when needed, and updated through functions defined in this file: 
1. 'handleUser' is used by WelcomePage & children components to update state.
2. 'handleGoal' is used by GoalsView & children components to update state.
3. 'handleGoalsDeleteTask' is used by GoalsView & children components to update state.
4. 'handleTasks' is used by GoalsView & children components to update state.
5. 'handleCompletedTask' is used by TeamView & childen components to update state.






export default App; -->

#### NavBar.js:

### ErrorPage.js:

### Client Folder:
The "client" folder houses our REACT frontend components.

#### WelcomePage.js:
WelcomePage.js is the UI visible at "/" route. It calls the child components ListUsers, CompletedCount, and CreateNewUser to allow you to create a new username, see the usernames already using this app, and see how many tasks the team has completed, and how many tasks are left to complete. It also provides basic user instructions for how to utilize the app.

##### ListUsers.js:
ListUsers.js maps through the list of all the users (held in state in App.js) to display all the usernames that are in use.

##### CompletedCount.js:
CompletedCount.js allows users to see how many tasks have been completed and how many are left to complete by filtering  through all the tasks (held in state in App.js), and displaying them.

##### CreateNewUser.js:
CreateNewUser.js uses formik and yup to create a validated form where a user can enter a username and it is added to the database after checking the datatype and seeing if that username has already been taken. CreateNewUser makes a post request to http://127.0.0.1:5555/ in order to do this.

#### GoalsView.js:
GoalsView.js is the UI visible at the "/goals" route and displays all the goals and their associated tasks. Next to each task, the username that has been assigned to that task is visible, as well as a 'delete' button so a task can be removed if it is no longer needed or mis-spelled. It calls the child components AddGoal, AddTask, and DeleteGoalTask to allow you to create a new goals and tasks and to delete tasks. The hook, useNaviage, is used to redirect a user to the "/team" route if a username is clicked on.  

##### AddGoal.js:
AddGoal.js uses formik and yup to create a validated form where a user can enter a new goal. AddGoal makes a post request to http://localhost:5555/goals in order to do this.

##### AddTask.js:
AddTask.js uses formik and yup to create a validated form where a user can enter a new task that is associated with the goal under which the "Add Task" form was submitted. AddTask makes a post request to http://localhost:5555/tasks and takes in the user input of the task, and the username responsible for completing the task.

##### DeleteGoalTask.js:
DeleteGoalTask.js uses a DELETE request to http://localhost:5555/tasks/${taskId} to delete a task from a goal.

#### TeamView.js:
TeamView.js is the UI visible at the "/team" route and displays all the users and their associated tasks. Next to each task, the goal that has been assigned to that task is visible, as well as a 'complete' button so a task can be marked as 'done' once it has been completed. There is not an option to delete a task from this page, because tasks are associated with goals, and therefore a user should be aware of how deleting a task could effect the team (so tasks can only added and deleted in the Goals View). It calls the child component CompleteTask. The hook, useNaviage, is used to redirect a user to the "/goals" route if a goal is clicked on.  

##### CompleteTask.js
CompleteTask uses a PATCH request to http://localhost:5555/tasks/${taskId} to update a task and rerenders the page using the function "handleCompletedTask" (which is located in App.js), to update the UI once a task has been marked completed (so that only tasks that need to be completed are shown).

#### Server Folder:
The "server" folder houses our Python backend code.

##### instance folder / app.db:
The "instance" folder houses our app.db file. This is our database and it contains 3 tables: "goals", "tasks", and "users".

##### app.py


##### models.py

##### seed.py






**cli.py** and **helpers.py**
`cli.py` handles the menus, and helpers.py handles user input and calling our Model's methods.


### Models
This application does not use SQLAlchemy, so, in the `models` folder (`lib/models`), you will find two Python files (**`state.py`** and **`city.py`**) with SQL statements.

#### state.py:
In the `State` class, two instance attribut is initialized: `id` (the primary key) and `name`. `name` uses the `@property` decorator as a "setter" and "getter". `@property` also validates that the attributes are strings and at least 1 character long.
`city.py` also includes the following methods:
1. `create_table()`: This class method allows us to create a states table in our database if one does not already exist.
2. `drop_table()`: Another class method, but it allows us to delete our states table in the database. Both this method and the one above are used in `debug.py`.
3. `save()`: An instance method that allows us to map an object to a table row in the states database table.
4. `create()`: A class method that draws on `save()` to not only create a new class instance, but also create a new table row in our states database table.
5. `update()`: An instance method that allows us to update a table row.
6. `delete()`: A instance method that deletes a state row from the states table.
7. `instance_from_db()`: A class method that maps to a states table row from our database into an instance of the class.
8. `get_all()`: This class method gets all rows from the states table, makes them into objects, and returns them in a list.
9. `find_by_id()`: A class method that searches our states table's primary keys for a row that matches. It then returns the row as an object.
10. `cities()`: An instance method that gets all the cities associated with a certain state.

#### city.py:
In the `City` class, four instance attributes are initialized: `id` (the primary key) `name`, `attraction`, and `state_id` (the foreign key). `name`, `attraction`, and `state_id` all use the `@property` decorator as a "setter" and "getter". `@property` also validates that the attributes are strings and at least 1 character long.
`city.py` also includes the following methods:
1. `create_table()`: This class method allows us to create a cities table in our database if one does not already exist.
2. `drop_table()`: Another class method, but it allows us to delete our cities table in the database. Both this method and the one above are used in `debug.py`.
3. `save()`: An instance method that allows us to map an object to a table row in the cities database table.
4. `create()`: A class method that draws on `save()` to not only create a new class instance, but also create a new table row in our cities database table.
5. `update()`: An instance method that allows us to update a table row.
6. `delete()`: A instance method that deletes a city row from the cities table.
7. `instance_from_db()`: A class method that maps a cities table row from our database into an instance of the class.
8. `get_all()`: This class method gets all rows from the cities table, makes them into objects, and returns them in a list.
9. `find_by_id()`: A class method that searches our cities table's primary keys for a row that matches. It then returns the row as an object.

### debug.py
To start from an empty database (or to reset your database), use the `empty_database` in `debug.py`. NOTE: This should NOT be called if you have added data into this app already (`empty_database` will delete everything in the database).
`debug.py` also holds seed data in `seed_database()`. `seed_database()` should NOT be called if you have added data into this app already (`seed_database()` will delete everything in the database and seed the database).
You can enter into breakpoint in this file by running the following command in your console:
```console
    python lib/debug.py
```

## Happy Coding!


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
