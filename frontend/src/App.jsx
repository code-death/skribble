import './App.css'
import Landing from "./pages/Landing/Landing.jsx";
import React, {useEffect} from "react";
import {Route, Routes} from "react-router";
import GameRoom from "./pages/GameRoom/GameRoom.jsx";
import {BrowserRouter} from "react-router-dom";
import io from "socket.io-client";

function App() {
    const rootElement = document.getElementById('root');
    const socket = io(import.meta.env.VITE_API_SOCKET_URL);

    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<Landing socket={socket}/>}/>
                <Route path={'/play'} element={<GameRoom socket={socket}/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
