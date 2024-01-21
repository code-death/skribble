import {createBrowserRouter} from "react-router-dom";
import GameRoom from "../pages/GameRoom/GameRoom.jsx";
import App from "../App.jsx";
import Landing from "../pages/Landing/Landing.jsx";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Landing />,
    },
    {
        path: '/play',
        element: <GameRoom />
    }
]);
