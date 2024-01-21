import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {router} from "./routes/index.jsx";
import {RouterProvider} from "react-router";
import 'react-toastify/dist/ReactToastify.css';
import {Provider} from 'react-redux'
import store from "./redux/store.js";
import {ToastContainer} from "react-toastify";

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
        />
        <App/>
    </Provider>
)
