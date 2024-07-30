import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./style.css";
import { UserProvider } from "./context/User";
import { ResultProvider } from "./context/Result";
import { ComponentProvider } from "./context/Component";
import Home from "./pages/Home";
import Auth from "./pages/Authentication";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <UserProvider>
      <ComponentProvider>
        <ResultProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </BrowserRouter>
        </ResultProvider>
      </ComponentProvider>
    </UserProvider>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
