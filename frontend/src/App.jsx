import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./style.css";
import { UserProvider } from "./context/User";
import { ResultProvider } from "./context/Result";
import { GameStateProvider } from "./context/GameState";
import Home from "./pages/Home";
import Auth from "./pages/Authentication";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <UserProvider>
      <ResultProvider>
        <GameStateProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </BrowserRouter>
        </GameStateProvider>
      </ResultProvider>
    </UserProvider>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
