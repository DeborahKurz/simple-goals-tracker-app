# Simple Goals Tracker Application For Families
Welcome to this Goals Tracker App (simple version)!

This application is designed with families in mind and provides a way for parents to start training their pre-teen and teenage children how to set goals and work towards them within a group. Families can set overarching goals and build responsibility and accountability within their home by assigning contributing tasks to each family member. Two "views" are provided in this app to help you understand the goals overall, and how each user fits into them: "Goals View" allows users to easily see each goal and assign tasks to users. "Team View" lets users view all their tasks in one place for easy reference. Users also have the ability to add their own subtasks to help break large tasks into smaller bite-sized pieces.

BASICS: This is a REACT/FLASK application. In the database, data is stored in four tables: "users", "goals", "tasks", and "subtasks".

Are you ready to get started?

## Yes please! Let's get started!
Awesome! I'm so excited you will be using this app.
To get things up and running, follow these steps:

1. **Fork** this app into your Github account.
2. **Copy** this app (Code -> SSH -> *copy*)
3. **Clone:** Open your Terminal and run: 
    ```console
        $ git clone then_paste_the_copy_here
    ```
4. **Install Dependencies For The Backend Code** by running these two commands:
    ```console
        pipenv install
        pipenv shell
    ```
5. **Get It Running:** Run the following command in your terminal: 
    ```console
        python server/app.py
    ```
6. **Install Dependencies For The Frontend Code & Start The App:**
    ```console
        npm install
        npm start
    ```

This application stores your goals and tasks in the `app.db` file where you will find four tables: 

"goals" Table:
| id | goal |
| ----------- | ----------- |
|id key - Integer | String |


"subtasks" Table (a child of 'tasks'):
| id | subtask | completed | task_id  |
| ----------- | ----------- | ----------- | ----------- |  ----------- |
|id - Integer | String | Boolean | Corresponding task id - Integer (foreign key) | 


"tasks" Table ('goals' and 'users' Join table):
| id | task | completed | goals_id  | users_id |
| ----------- | ----------- | ----------- | ----------- |  ----------- |
|id - Integer | String | Boolean | Corresponding goal id - Integer (foreign key) | Corresponding user id - Integer (foreign key) |


"users" Table:
| id | username |
| ----------- | ----------- |
|id key - Integer | String |


### Tree:
In order to present cleaner code, the files have been broken into two major folders: "server" (to house the server-side files) and "client" (to house the client-side files).
This is the project tree:
*(files with a 'star' by them will be discussed in more detail below)*

```console
.
├── client *
│     └── src
│         ├── components *
│         │   ├── AddGoal.js *
│         │   ├── AddSubtask.js *
│         │   ├── AddTask.js * 
│         │   ├── App.js *
│         │   ├── CompletedCount.js *
│         │   ├── CompletedSubtask.js *
│         │   ├── CompleteTask.js *
│         │   ├── CreateNewUser.js *
│         │   ├── DeleteGoalTask.js *
│         │   ├── DeleteSubtask.js *
│         │   ├── DeleteUser.js *
│         │   ├── EditSubtask.js
│         │   ├── EditUsername.js
│         │   ├── ErrorPage.js *
│         │   ├── GoalsView.js *
│         │   ├── ListGoals.js *
│         │   ├── ListUsers.js *
│         │   ├── NavBar.js *
│         │   ├── SubtasksView.js *
│         │   ├── TeamView.js *
│         │   ├── UserInfo.js *
│         │   └── WelcomePage.js *
│         ├── index.js 
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
```


### Client Folder:
The "client" folder houses our REACT frontend components.

### routes.js:
'routes.js' defines the routes used in this application. The following components are associated with the various routes: 'App' ('/' route), 'WelcomePage' ('/' route), 'GoalsView' ('/goals' route), 'TeamView' ('/users' route), 'UserInfo' ('/users/:userId'), 'SubtasksView' ('/users/:userId/tasks/:taskId'), and 'ErrorPage' (any route that has not been defined).

### Components Folder:
The "client/src/components" folder houses our frontend components used to build the parts of the webpages that are visible to the user.

The components in this file use Matieral-UI, Emotion, and basic inline CSS styling to create the modern look in the user interface.

#### App.js:
App.js is in charge of displaying different components based on what route is being rendered ('/' renders "WelcomePage", '/goals' renders "GoalsView", '/users' renders "TeamView", '/users/:userId' renders "UserInfo", and '/users/:userId/tasks/:taskId renders "SubtasksView"). useEffect fetches to '/' for all users and '/goals' for all goals. App.js also uses useContext to pass state variables and functions down to children and grandchildren components.

App.js holds two state variables (userList and allGoals) which are passed down to child components when needed using useContext, and updated through the functions defined in this file: 
1. 'handleUser' is used by WelcomePage & children components to update state.
2. 'handleGoal' is used by GoalsView & children components to update state.
3. 'handleGoalsDeleteTask' is used by GoalsView & children components to update state.
4. 'handleTasks' is used by GoalsView & children components to update state.
5. 'handleCompletedTask' is used by TeamView & children components to update state.
6. 'handleUpdatedUser' is used by UserInfo & children components to update state.
7. 'handleDeleteUser' is used by UserInfo & children components to update state. 
8. 'handleNewSubtask' is used by SubtasksView & children components to update state. 
9. 'handleCompletedSubtask' is used by SubtasksView & children components to update state. 
10. 'handleEditSubtask' is used by SubtasksView & children components to update state. 
11. 'handleDeletedSubtask' is used by SubtasksView & children components to update state. 

#### NavBar.js:
NavBar.js allows us to render a navbar on all pages for easy user navigation. NavBar.js also calls the child component CompletedCount.js so it can be seen on all routes in the application. CompletedCount allows you to see how many tasks the team has completed versus how many tasks are left to complete.
The navbar does not include navigation to UserInfo or SubtasksView. UserInfo is accessed through the Home page's list of users. SubtasksView allows users to only access subtasks associated with a specific task assigned to a certain user. Neither of these components/routes require direct access from the navbar.

#### ErrorPage.js:
ErrorPage renders an error if an undefined route is navigated to. It also renders the NavBar component so that users can return to the defined routes.

#### WelcomePage.js:
WelcomePage.js is the UI visible at "/" route. It calls the child components ListUsers and CreateNewUser to allow you to create a new username and see the usernames already using this app. It also provides basic user instructions for how to use the app.

##### ListUsers.js:
ListUsers.js maps through the list of all the users (held in state in App.js) to display all the usernames that are in use.

##### CompletedCount.js:
CompletedCount.js allows users to see how many tasks have been completed and how many are left to complete by filtering through all the tasks (held in state in App.js), and displaying them.

##### CreateNewUser.js:
CreateNewUser.js uses formik and yup to create a validated form where a user can enter a username and it is added to the database after checking the datatype and seeing if that username has already been taken. CreateNewUser makes a post request to http://127.0.0.1:5555/ in order to do this.



#### UserInfo.js:
UserInfo.js is the UI visible at "/users/:userId" route. It calls the child components EditUsername and DeleteUser to allow you to edit your usernames or delete a username that is no longer needed. It also lists all the tasks and subtasks a user has marked as completed for easy reference. 

##### EditUsername.js:
EditUsername.js uses formik and yup to create a validated form where a user can enter an updated version of a username in order to 'edit' the username. EditUsername makes a PATCH request to http://localhost:5555/${userId} and takes in the user's input of the updated username. The UI is then re-rendered using the function "handleUpdatedUser" (which is located in App.js), to update the page with the new username.

##### DeleteUser.js:
DeleteUser.js uses a DELETE request to http://localhost:5555/${userId} to delete a user then re-renders the page using the "handleDeletedUser" function (which is located in App.js). Once a user has been deleted, the useNavigate hook is implimented to navigate you back to the Home page ('/').



#### GoalsView.js:
GoalsView.js is the UI visible at the "/goals" route and displays all the goals and their associated tasks. Next to each task, the username that has been assigned to that task is visible, as well as a 'delete' button so a task can be removed if it is no longer needed or miss-spelled. It calls the child components AddGoal, AddTask, and ListGoals to allow users to create new goals and tasks and to delete tasks. The hook, useNavigate, is used to redirect a user to the "/team" route if a username is clicked on.  

##### AddGoal.js:
AddGoal.js uses formik and yup to create a validated form where a user can enter a new goal. AddGoal makes a post request to http://localhost:5555/goals in order to do this.

##### AddTask.js:
AddTask.js uses formik and yup to create a validated form where a user can enter a new task that is associated with the goal under which the "Add Task" form was submitted. AddTask makes a post request to http://localhost:5555/tasks and takes in the user input of the task, and the username responsible for completing the task.

##### ListGoals.js:
ListGoals.js was created to make the code in GoalsView easier to read. It's purpose is to map through a goal that it has been handed and determine what to display based on whether the goal's tasks are completed or not (and how many have been completed).  It's child component is DeleteGoalTask.js which adds the final functionality of deleting a certain goal's task. 

##### DeleteGoalTask.js:
DeleteGoalTask.js uses a DELETE request to http://localhost:5555/tasks/${taskId} to delete a task.



#### TeamView.js:
TeamView.js is the UI visible at the "/user" route and displays all the users and their associated tasks. Next to each task the goal that has been assigned to that task is visible, as well as a 'complete' button so a task can be marked as 'done' once it has been completed. There is not an option to delete a task from this page because tasks are associated with goals and therefore a user should be aware of how deleting a task could effect the team (so tasks can only added and deleted in the Goals view). TeamView calls the child component CompleteTask. The hook, useNavigate, is used to redirect a user to the "/goals" route if a goal is clicked on.  

##### CompleteTask.js
CompleteTask uses a PATCH request to http://localhost:5555/tasks/${taskId} to update a task then re-renders the page using the function "handleCompletedTask" (which is located in App.js) and updates the UI once a task has been marked completed (so that only tasks that need to be completed are shown).



#### SubtasksView.js:
TeamView.js is the UI visible at the "/users/:userId/tasks/:taskId" route and displays all the subtasks assoicated with a certain task. This task is selected in Team View where a user can click the 'View Subtasks' button next to one of their tasks and be taken to see a list of all the subtasks associated with their chosen task. At the top of the page the task that was selected is displayed as the title. The subtasks are displayed below with options to: create a new subtask, edit a chosen subtask, complete a chosen subtask, or delete a chosen subtask. The page updates immediately with any changes. SubtasksView calls the children components AddSubtask, CompleteSubtask, EditSubtask, and DeleteSubtask. useContext allows us to use state variables in App.js in order to avoid unneccessary fetches to the server.

##### AddSubtask.js:
AddSubtask.js uses formik and yup to create a validated form where a user can enter a new subtask that is associated with a certain task. AddSubtask makes a post request to http://localhost:5555/subtasks and takes in the user's input of the new subtask.

##### CompleteSubtask.js:
CompleteSubtask uses a PATCH request to http://localhost:5555/subtasksid/${subtaskId} to update a subtask then re-renders the page using the function "handleCompletedSubtask" (which is located in App.js) and updates the UI once a task has been marked completed (so that only subtasks that are completed display with a line crossed through them, while the uncompleted subtasks remain unobstructed).

##### EditSubtask.js:
EditSubtask.js uses formik and yup to create a validated form where a user can enter an updated version of a subtask in order to 'edit' the subtask. EditSubtask makes a PATCH request to http://localhost:5555/subtasksid/${subtaskId} and takes in the user's input of the updated subtask. The UI is then re-rendered using the function "handleEditSubtask" (which is located in App.js).

##### DeleteSubtask.js:
DeleteSubtask.js uses a DELETE request to http://localhost:5555/subtasksid/${subtaskId} to delete a subtask then re-renders the page using the "handleDeletedSubtask" function (which is located in App.js).


#### Server Folder:
The "server" folder houses our Python/FLASK backend code.

##### instance folder / app.db:
The "instance" folder houses our app.db file. This is our database and it contains 4 tables: "goals", "subtasks", "tasks", and "users" (see above for more details on these tables).

##### app.py
'app.py' defines the Flask endpoints that can be made from the frontend to our backend. It tells the application what to do in the database when a request is received, and allows our frontend to make fetch requests without a hitch.

#### models.py
'models.py' defines our database tables and creates relationships, back-populating, cascades, and serialization rules so tables seamlessly interact with each other.

##### seed.py
'seed.py' lets you seed the database with random (and non-coherent) data. 5 users will be created, along with 10 goals, 30 tasks (assigned randomly to the 5 users and 10 goals), and 100 subtasks (assigned randomly to the 30 tasks). Currently the code that seeds the database is commented out. This allows a user to run the following command in the terminal and have an empty project:
     ```console
        python server/seed.py
    ```
To seed the database with random data, uncomment all the code in the seed.py file and then run the following command (this will delete any data you have previously added to the app):
    ```console
        python server/seed.py
    ```


### I hope you enjoy this simple goals-tracker application!