import App from "./components/App.js";
import ExistingUserLogin from "./components/ExistingUserLogin.js";
import CreateNewUser from "./components/CreateNewUser.js";
import GoalsRoute from "./components/GoalsView.js";
import TeamView from "./components/TeamView.js";
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
                path: "/team",
                element: <TeamView />,
            }
        ]
    },
]

export default routes;