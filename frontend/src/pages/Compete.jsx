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
  // const [res, setRes] = useState(false);
  const navigate = useNavigate();

  const socket = useRef();

  const {
    setPara,
    mode,
    setMode,
    subMode,
    setSubMode,
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

  // const navigate = useNavigate();

  const CreateRoom = () => {
    socket.current.emit("create-room", (room_id) => {
      setJoin(true);
      setRoomID(room_id);
      document.querySelector(".room-controls").classList.add("hidden");
      document.querySelector(".room").classList.remove("hidden");

      socket.current.on("op-joined", (roomID) => {
        // console.log("op-joined");
        socket.current.emit("ready", mode, subMode, roomID);
      });
    });
  };

  const JoinRoom = () => {
    document.querySelector(".room-controls").classList.add("hidden");
    document.querySelector(".room").classList.remove("hidden");
    socket.current.emit("join-room", roomID);
    setJoin(true);
  };

  const startCountDown = async () => {
    setCountDown(5);
    setGameState("count-down");
    const interval = setInterval(() => {
      setCountDown((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(interval);
          socket.current.emit("start", roomID);
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  };

  const rematch = () => {
    setGameState("waiting");
    setJoin(true);
    setLoading(true);
    socket.current.emit("rematch-request", roomID, () => {
      socket.current.on("rematch-response", (res) => {
        if (res) {
          socket.current.emit("ready", mode, subMode, roomID);
        } else {
          alert("Other Player Rejected the Request");
        }
        // if (!res) {
        //   console.log("The other player rejected the request");
        //   setGameState("idle");
        //   setLoading(false);
        //   setJoin(false);
        //   document.querySelector(".match-controls").classList.remove("hidden");
        //   document.querySelector(".rematch").classList.add("hidden");
        //   document.querySelector(".challenge").classList.remove("hidden");
        //   document.querySelector(".rematch-request").classList.add("hidden");
        // }
        // console.log(res);
      });
    });
  };

  useEffect(() => {
    if (countDown === 0 && gameState === "count-down") {
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

    socket.current.on("ready", async (mode, submode, para) => {
      await delay(1000);
      setMode(mode);
      setSubMode(submode);
      setPara(para);
      await startCountDown();
      setLoading(false);
    });

    socket.current.on("start", () => {
      // console.log(mode, subMode, para);
      startTimer();
    });

    socket.current.on("opponent-cursor", (x, y) => {
      handleOpCursor(x, y);
    });

    socket.current.on("opponent-result", (opresult) => {
      setOpResult(opresult);
    });

    socket.current.on("rematch-request", async () => {
      document.querySelector(".match-controls").classList.add("hidden");
      document.querySelector(".rematch-request").classList.remove("hidden");
      await delay(5000);
      socket.current.emit("rematch-response", roomID, false);
      setRoomID(null);
      navigate("/compete");
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
                onInput={(e) => setRoomID(parseInt(e.target.value))}
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
          <div className="rematch-request hidden w-full px-3 py-5">
            The opponent requested to rematch{" "}
            <div className="flex gap-5 px-2 py-1">
              <button
                onClick={() => {
                  socket.current.emit("rematch-response", roomID, true);
                }}
              >
                Accept
              </button>
              <button
                onClick={() => {
                  socket.current.emit("rematch-response", roomID, false);
                }}
              >
                Reject
              </button>
            </div>
          </div>
          <div className="match-controls my-10 flex w-full justify-evenly ">
            <button
              className="rematch rounded bg-primary-color px-4 py-2 text-[#d0d0d0] "
              onClick={rematch}
            >
              Rematch
            </button>
            <button
              className="challenge hidden rounded bg-primary-color px-4 py-2 text-[#d0d0d0] "
              onClick={() => {
                setJoin(false);
                setGameState("idle");
                navigate("/compete");
              }}
            >
              Challenge
            </button>
            <button
              className="practice rounded bg-primary-color px-4 py-2 text-[#d0d0d0] "
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
