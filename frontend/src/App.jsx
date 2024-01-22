import React, {useEffect, useState} from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./components/Loader.jsx";
import {changeLoadingState, setSocketId} from "./redux/store.js";
import GameRoom from "./pages/GameRoom/GameRoom.jsx";
import Landing from "./pages/Landing/Landing.jsx";

function App({socket}) {
    const dispatch = useDispatch();

    let isLoading = useSelector((state) => state.isLoading);

    useEffect(() => {
        const handleConnect = () => {
            dispatch(changeLoadingState(false));
            dispatch(setSocketId(socket.id))
        };

        return () => {
            socket.off('connect', handleConnect);
        };
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<Landing socket={socket} />} />
                <Route path={'/play'} element={<GameRoom socket={socket} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
