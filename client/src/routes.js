import App from "./components/App.js";
import LoginRoute from "./components/LoginRoute.js";
import GoalsRoute from "./components/GoalsRoute.js";
import TasksRoute from "./components/TasksRoute.js";

const routes = [
    {
        path: "/",
        element: <App />,
        // errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <LoginRoute />
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