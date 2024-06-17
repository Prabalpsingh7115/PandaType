import {createRoot} from "react-dom/client"
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';

import "./style.css"
import Login from "./pages/Login"; 
import Register from "./pages/Register"; 
import Home from "./pages/Home"

const App=()=>{

    return (
        <GoogleOAuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                </Routes>
            </BrowserRouter>
        </GoogleOAuthProvider>
    )
}

const container=document.getElementById("root");
const root=createRoot(container);
root.render(<App/>)