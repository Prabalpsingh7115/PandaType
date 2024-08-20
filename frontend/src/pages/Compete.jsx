/* eslint-disable react-hooks/exhaustive-deps */
import { io } from "socket.io-client";
import { useState, useContext, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import TypingArena from "../components/TypingArena";
import { UserContext } from "../context/User";

const Compete = () => {
  const [roomID, setRoomID] = useState(null);
  const { user, setUser } = useContext(UserContext);
  const [disable, setDisable] = useState(false);
  const socket = useRef();

  // const navigate = useNavigate();

  const CreateRoom = () => {
    // if (!user) {
    //   navigate("/auth");
    //   return;
    // }

    socket.current.emit("create");
    document.querySelector(".controls").classList.add("hidden");
    document.querySelector(".room").classList.remove("hidden");

    socket.current.on("roomId", (roomID) => {
      setRoomID(roomID);
    });
  };

  const JoinRoom = () => {
    // if (!user) {
    //   navigate("/auth");
    //   return;
    // }
    socket.current.emit("join-room", roomID);
    document.querySelector(".controls").classList.add("hidden");
    document.querySelector(".room").classList.remove("hidden");
  };

  const sendMessage = () => {
    console.log("clicked");
    const msg = "jghsgdas";
    socket.current.emit("send-message", msg, roomID);
  };

  useEffect(() => {
    socket.current = io(import.meta.env.VITE_API_BASE_URL);
    socket.current.on("connect", () => {
      console.log(socket.current.id, " connected");
    });
    socket.current.on("message", (msg) => {
      console.log(msg);
    });
  }, []);

  return (
    <div className="flex h-screen w-11/12 flex-col items-center overflow-hidden font-customFont text-4xl">
      <Header />
      <TypingArena />
      <button onClick={sendMessage}>Send</button>
      <div className="room hidden"> Room id : {roomID}</div>
      <div className="controls flex h-1/6 items-center justify-center gap-5 text-3xl text-gray-600">
        <button className="rounded-md  px-2 py-1" onClick={CreateRoom}>
          Create Room
        </button>
        <input
          className="room w-1/3 rounded-md bg-gray-400 px-2 py-1 text-black"
          placeholder="Room Code"
          disabled={disable}
          onInput={(e) => setRoomID(e.target.value)}
        />
        <button
          className="rounded-md px-2 py-1"
          disabled={disable}
          onClick={JoinRoom}
        >
          Join Room
        </button>
      </div>
    </div>
  );
};

export default Compete;
