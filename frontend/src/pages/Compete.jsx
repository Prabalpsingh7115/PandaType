/* eslint-disable react-hooks/exhaustive-deps */
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import TypingArena from "../components/TypingArena";
import delay from "../functions/delay";
import { GameStateContext } from "../context/GameState";

const Compete = () => {
  const [roomID, setRoomID] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { setPara, mode, submode } = useContext(GameStateContext);
  const [join, setJoin] = useState(false);
  const socket = useRef();

  // const navigate = useNavigate();

  const CreateRoom = () => {
    socket.current.emit("create-room", (room_id) => {
      setJoin(true);
      setRoomID(room_id);
      document.querySelector(".controls").classList.add("hidden");
      document.querySelector(".room").classList.remove("hidden");

      socket.current.on("player-joined", (room_id) => {
        console.log("other-player-joined to ", room_id);
      });
    });
  };

  const JoinRoom = async () => {
    document.querySelector(".controls").classList.add("hidden");
    document.querySelector(".room").classList.remove("hidden");
    socket.current.emit("join-room", roomID, () => {
      setJoin(true);
      socket.current.emit("player-joined", mode, submode, roomID);
    });
  };

  useEffect(() => {
    socket.current = io(import.meta.env.VITE_API_BASE_URL);
    socket.current.on("connect", () => {
      console.log(socket.current.id, " connected");
    });

    socket.current.on("ready", async (msg, para) => {
      setPara(para);
      await delay(3000);
      setLoading(false);
    });

    return () => {
      console.log(socket.current.id, " disconnected");
      socket.current.disconnect();
    };
  }, []);

  useEffect(() => {
    console.log(join);
  }, [join]);

  useEffect(() => {
    console.log(roomID);
  }, [roomID]);

  return (
    <div className="flex h-screen w-11/12 flex-col items-center overflow-hidden font-customFont text-4xl">
      <Header />
      {join && (
        <>
          {loading ? (
            <div>
              {" "}
              Room Id : {roomID}
              <div>Loading.....</div>
            </div>
          ) : (
            <TypingArena />
          )}
        </>
      )}
      {!join && (
        <>
          <div className="room hidden"> Room id : {roomID}</div>
          <div className="controls flex h-1/6 items-center justify-center gap-5 text-3xl text-gray-600">
            <button className="rounded-md  px-2 py-1" onClick={CreateRoom}>
              Create Room
            </button>
            <input
              className="room w-1/3 rounded-md bg-gray-400 px-2 py-1 text-black"
              placeholder="Room Code"
              onInput={(e) => setRoomID(e.target.value)}
            />
            <button className="rounded-md px-2 py-1" onClick={JoinRoom}>
              Join Room
            </button>
          </div>
          <button
            className={`text-3xl hover:text-gray-300 hover:underline`}
            onClick={() => {
              navigate("/");
            }}
          >
            Practice
          </button>
        </>
      )}
    </div>
  );
};

export default Compete;
