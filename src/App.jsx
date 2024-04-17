import {createRoot} from "react-dom/client"
import Header from "./Header";
import "./style.css"

const App=()=>{

    return (
        <div id="main">
            <h1 className="text-7xl text-blue-500">Panda Type</h1>
            <Header/>
        </div>
    )
}

const container=document.getElementById("root");
const root=createRoot(container);
root.render(<App/>)