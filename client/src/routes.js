import App from "./components/App.js";
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