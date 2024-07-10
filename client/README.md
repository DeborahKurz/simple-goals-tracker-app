#To Do List:

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
In order to present cleaner code, the user view was broken into two files:
**cli.py** and **helpers.py**
`cli.py` handles the menus, and helpers.py handles user input and calling our Model's methods.

#### cli.py:
This file gives you the menus that are visible in the CLI and calls methods in `helpers.py` (which call methods that handle SQL in our models).
**`menu()` and `main()`** work together as the main menu (the one we see when we start the app in our CLI). They include the following options:
1. See all saved U.S. States (this allows you to see all the States they ahve added to the wishlist)
2. Add a new U.S. State (this lets you add a new State to your wishlist)
3. View a State's details (this asks you to choose a State and then shows you the details of that state which include the cities you have added and notes on what specifically you want to see/do in each city. Under the hood, this option will take you to the "city menu" described below)
4. Delete a State (this option is used to delete a State and its corresponding cities from your wishlist)
5. Exit the program (this is pretty self explainitory: when you are done adding to or updating your wishlist, you can select this option to exit the program)

**`sub_menu()` and `cities_loop()`** work together to create a second menu designed specifically for handling your saved cities. This menu includes the following options:
1. Add a new city (this allows you to add a new city to the State you are currently in)
2. Delete a city (this lets you to remove a city from your wishlist)
3. Return to the 'States' Menu (this is how you return to the "main menu")

`main()` and `cities_loop()` call methods that were placed in the `helpers.py` file in order to make cleaner code.

#### helpers.py:
This file holds some of the code that is called in `cli.py`. It also draws from our `models` folder (`state.py` and `city.py`) to make the `cli.py` menu work.

`helpers.py` imports both the State and City classes and uses them in some of the following methods:
1. `exit_program()`: Uses `exit()` to exit out of our app's CLI menu.
2. `list_states()`: Lists States or alerts you to add a State if you haven't already.
3. `choose_state()`: Handles user input and allows you to choose which State specifically you would like to see details on.
4. `delete_state()`: Calls methods from both `state.py` and `city.py` to delete a State and all it's associated cities from the database.
5. `add_state()`: Takes your input and allows you to add a state to the database.
6. `list_cities()`: Lists all the cities associated with a chosen State, or alerts you to add a city if there aren't any cities in the database (assicoated with the chosen State).
7. `add_city()`: Handles user input and allows you to add a city to the database.
8. `delete_city()`: Deletes a city associated with a chosen State.
9. `separator()`: Creates a line of stars (*) that acts as a separator in the command line.

These methods call on methods in the `models` folder.

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
