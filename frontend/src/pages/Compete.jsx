/* eslint-disable react-hooks/exhaustive-deps */
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import TypingArena from "../components/TypingArena";
import delay from "../functions/delay";
import { GameStateContext } from "../context/GameState";
import Loader from "../components/Loader";
import useTimer from "../hooks/useTimer";
import handleOpCursor from "../functions/handleOpCursor";
import CompeteResult from "../components/CompeteResult";

const Compete = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const socket = useRef();

  const {
    setPara,
    mode,
    submode,
    setGameType,
    gameState,
    setGameState,
    roomID,
    setRoomID,
    result,
    setOpResult,
  } = useContext(GameStateContext);
  const [join, setJoin] = useState(false);
  const [countDown, setCountDown] = useState();
  const { startTimer } = useTimer();
  const [accept, setAceept] = useState(false);

  // const navigate = useNavigate();

  const CreateRoom = () => {
    socket.current.emit("create-room", (room_id) => {
      setJoin(true);
      setRoomID(room_id);
      document.querySelector(".room-controls").classList.add("hidden");
      document.querySelector(".room").classList.remove("hidden");

      socket.current.on("player-joined", (room_id) => {
        console.log("other-player-joined to ", room_id);
      });
    });
  };

  const JoinRoom = () => {
    document.querySelector(".room-controls").classList.add("hidden");
    document.querySelector(".room").classList.remove("hidden");
    socket.current.emit("join-room", roomID, () => {
      setJoin(true);
      socket.current.emit("player-joined", mode, submode, roomID);
    });
  };

  const startCountDown = async () => {
    setCountDown(5);
    setGameState("count-down");
    const interval = setInterval(() => {
      setCountDown((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  };

  const rematch = () => {
    setGameState("waiting");
    setLoading(true);
    setJoin(true);
    socket.current.emit("rematch-request", roomID, () => {
      socket.current.on("rematch-response", (res) => {
        console.log(res);
      });
    });
  };

  useEffect(() => {
    if (countDown === 0 && gameState === "count-down") {
      // console.log("start");
      setGameState("playing");
      startTimer();
    }
  }, [countDown]);

  useEffect(() => {
    if (gameState === "finished") {
      socket.current.emit("result", roomID, result);
    }
  }, [gameState]);

  useEffect(() => {
    setGameType("compete");
    socket.current = io(import.meta.env.VITE_API_BASE_URL);
    socket.current.on("connect", () => {
      console.log(socket.current.id, " connected");
    });

    socket.current.on("ready", async (msg, para) => {
      await delay(1000);
      setPara(para);
      setLoading(false);
      startCountDown();
    });

    socket.current.on("start", () => {
      // console.log("start");
      startTimer();
    });

    socket.current.on("opponent-cursor", (x, y) => {
      // console.log("getting", x, y);
      handleOpCursor(x, y);
    });

    socket.current.on("opponent-result", (opresult) => {
      setOpResult(opresult);
    });

    socket.current.on("rematch-request", async (room_id) => {
      document.querySelector(".match-controls").classList.add("hidden");
      document.querySelector(".rematch-request").classList.remove("hidden");

      // await delay(2000);
      // socket.current.emit("rematch-response", room_id, accept);
      document.querySelector(".match-controls").classList.add("hidden");
      document.querySelector(".rematch-request").classList.remove("hidden");
    });

    return () => {
      console.log(socket.id, " disconnected");
      setRoomID(null);
      setJoin(false);
      socket.current.disconnect();
    };
  }, []);

  useEffect(() => {
    // console.log(join);
  }, [join]);

  useEffect(() => {
    // console.log(gameState);
  }, [gameState]);

  useEffect(() => {
    // console.log(roomID);
  }, [roomID]);

  return (
    <div className="flex h-screen w-5/6 flex-col items-center overflow-hidden font-customFont text-4xl">
      <Header />
      {gameState !== "finished" &&
        (join ? (
          loading ? (
            <div>
              Room Id : {roomID}
              <Loader message={"Waiting for the other player to join"} />
            </div>
          ) : (
            <>
              {gameState === "count-down" && (
                <div className="flex-col">
                  <div>Get Ready in {countDown}</div>
                  <Loader message={"Ready to race ?"} />
                </div>
              )}
              {gameState === "playing" && <TypingArena socket={socket} />}
            </>
          )
        ) : (
          <>
            <div className="room hidden"> Room id : {roomID}</div>
            <div className="room-controls flex h-1/6 items-center justify-center gap-5 text-3xl text-gray-600">
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
        ))}
      {gameState === "finished" && (
        <div className="w-full flex-col">
          <CompeteResult />
          <div className="rematch-request hidden">
            The opponent requested to rematch{" "}
            <button
              onClick={() => {
                setAceept(true);
              }}
            >
              Accept
            </button>
          </div>
          <div className="match-controls my-10 flex w-full justify-evenly ">
            <button
              className="rounded bg-primary-color px-4 py-2 text-[#d0d0d0] "
              onClick={rematch}
            >
              Rematch
            </button>
            <button
              className="rounded bg-primary-color px-4 py-2 text-[#d0d0d0] "
              onClick={() => {
                navigate("/");
              }}
            >
              Practice
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Compete;
