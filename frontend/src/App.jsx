import './App.css'
import Landing from "./pages/Landing/Landing.jsx";
import React, {useEffect} from "react";
import {Route, Routes} from "react-router";
import GameRoom from "./pages/GameRoom/GameRoom.jsx";
import {BrowserRouter} from "react-router-dom";
import io from "socket.io-client";
import {useDispatch, useSelector} from "react-redux";
import Loader from "./components/Loader.jsx";
import {changeLoadingState} from "./redux/store.js";

function App() {
    const socket = io(import.meta.env.VITE_API_SOCKET_URL);
    const dispatch = useDispatch();

    let isLoading = useSelector(state => state.isLoading);

    useEffect(() => {
        socket.on('connect', () => {
            dispatch(changeLoadingState(false));
        })
    }, []);

    return (
        <BrowserRouter>
            {isLoading ? <Loader /> : null}
            <Routes>
                <Route path={'/'} element={<Landing socket={socket}/>}/>
                <Route path={'/play'} element={<GameRoom socket={socket}/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
