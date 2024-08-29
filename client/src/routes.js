import App from "./components/App.js";
import WelcomePage from "./components/WelcomePage.js";
import GoalsRoute from "./components/GoalsView.js";
import TeamView from "./components/TeamView.js";
import SubtasksView from "./components/SubtasksView.js";
import UserInfo from "./components/UserInfo.js";
import ErrorPage from "./components/ErrorPage.js";


const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
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
                path: "/users",
                element: <TeamView />,
            },
            {
                path: "/users/:userId/tasks/:taskId",
                element: <SubtasksView />
            },
            {
                path: "/users/:userId",
                element: <UserInfo />
            }
        ]
    },
];

export default routes;