import App from "./components/App.js";
import ExistingUserLogin from "./components/ExistingUserLogin.js";
import CreateNewUser from "./components/CreateNewUser.js";
import GoalsRoute from "./components/GoalsRoute.js";
import TasksRoute from "./components/TasksRoute.js";
import WelcomePage from "./components/WelcomePage.js";

const routes = [
    {
        path: "/",
        element: <App />,
        // errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <WelcomePage />
            },
            {
                path: "/login",
                element: <ExistingUserLogin />
            },
            {
                path: "/new",
                element: <CreateNewUser />
            },
            {
                path: "/goals",
                element: <GoalsRoute />,
            },
            {
                path: "/tasks",
                element: <TasksRoute />,
            }
        ]
    },
]

export default routes;