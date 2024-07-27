import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./style.css";
import Auth from "./pages/Authentication";
import Home from "./pages/Home";
import { UserProvider } from "../context/User";

const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
