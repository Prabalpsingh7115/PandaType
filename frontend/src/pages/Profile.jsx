/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

import useLogout from "../hooks/useLogout";
import { UserContext } from "../context/User";
import Header from "../components/Header";
import api from "../api/axios";
import { GameStateContext } from "../context/GameState";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const { setLoading } = useContext(GameStateContext);
  const [profile, setProfile] = useState(null);
  const logout = useLogout();
  const navigate = useNavigate();

  const verifyRefreshToken = async () => {
    try {
      const response = await api.post(
        "/refresh",
        {},
        {
          withCredentials: true,
        },
      );

      const decode = jwtDecode(response.data.accessToken);
      await setUser((prev) => {
        return {
          ...prev,
          username: decode.username,
          accessToken: response.data.accessToken,
        };
      });
      Cookies.remove("accessToken");
      Cookies.set("accessToken", response.data.accessToken);
    } catch (err) {
      // console.log(err);
      if (err.response.status === 403) {
        logout();
        navigate("/auth");
      }
    } finally {
      setLoading(false);
    }
  };

  const getProfile = async () => {
    try {
      const response = await api.get(`/profile?username=${user?.username}`, {
        headers: {
          authorization: `Bearer ${user?.accessToken}`,
        },
      });
      setProfile(response.data);
    } catch (err) {
      // console.log(err);
      if (err.response.status === 403) {
        await verifyRefreshToken();
      }
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
    setLoading(true);
    getProfile();
    setLoading(false);
  }, []);

  const dateformat = (date) => {
    if (!date) {
      return "";
    }

    const [month, day, year] = date.split("/");
    const monthName = months[parseInt(month) - 1];
    return day + " " + monthName + " " + year;
  };

  const timeformat = (time) => {
    const sec = time % 60;
    const min = Math.floor(time / 60) % 60;
    const hr = Math.floor(time / 3600);

    let ans = "";

    if (hr < 10) {
      ans += "0";
    }
    ans += String(hr);
    ans += ":";
    if (min < 10) {
      ans += "0";
    }
    ans += String(min);
    ans += ":";
    if (sec < 10) {
      ans += "0";
    }
    ans += String(sec);

    return ans;
  };

  return (
    <div className="flex h-screen w-11/12 flex-col items-center gap-2 overflow-hidden font-customFont">
      <Header />
      <div className="flex h-2/5 w-full items-center rounded-lg bg-[#393B44] px-5">
        <div className="flex w-1/3 flex-col items-center justify-center">
          <span className="text-6xl">{user?.username}</span>
          <span className="text-xl text-gray-400">
            Joined {dateformat(profile?.joindate.substr(0, 10))}
          </span>
        </div>
        <hr className="h-4/5 w-2 rounded-lg bg-gray-400" />
        <div className="info flex w-2/3">
          <div className="flex w-full flex-col items-center justify-center">
            <span className="text-xl text-gray-400">Tests Started</span>
            <span className="text-3xl ">{profile?.tests.tstart}</span>
          </div>
          <div className="flex w-full flex-col items-center justify-center">
            <span className="text-xl text-gray-400">Tests Finished</span>
            <span className="text-3xl ">{profile?.tests.tfinish}</span>
          </div>
          <div className="flex w-full flex-col items-center justify-center">
            <span className="text-xl text-gray-400">Time Typing</span>
            <span className="text-3xl ">
              {timeformat(profile?.tests.ttime)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex h-2/5 w-full items-center justify-between gap-2">
        <div className="info flex h-3/5 w-full items-center justify-center rounded-lg bg-[#393B44]">
          <div className="flex w-1/4 flex-col items-center justify-center">
            <span className="text-xl text-gray-400">15 seconds</span>
            <span className="text-3xl ">
              {profile?.records?.modeTime?.fifteen !== 200
                ? profile?.records?.modeTime?.fifteen
                : "__" || "__"}
            </span>
          </div>
          <div className="flex w-1/4 flex-col items-center justify-center">
            <span className="text-xl text-gray-400">30 seconds</span>
            <span className="text-3xl ">
              {profile?.records?.modeTime?.thirty !== 200
                ? profile?.records?.modeTime?.thirty
                : "__" || "__"}
            </span>
          </div>
          <div className="flex w-1/4 flex-col items-center justify-center">
            <span className="text-xl text-gray-400">60 seconds</span>
            <span className="text-3xl ">
              {profile?.records?.modeTime?.sixty !== 200
                ? profile?.records?.modeTime?.sixty
                : "__" || "__"}
            </span>
          </div>
          <div className="flex w-1/4 flex-col items-center justify-center">
            <span className="text-xl text-gray-400">120 seconds</span>
            <span className="text-3xl ">
              {profile?.records?.modeTime?.onetwenty !== 200
                ? profile?.records?.modeTime?.onetwenty
                : "__" || "__"}
            </span>
          </div>
        </div>

        <div className="info flex h-3/5 w-full items-center justify-center rounded-lg bg-[#393B44] p-5">
          <div className="flex w-1/4 flex-col items-center justify-center">
            <span className="text-xl text-gray-400">25 words</span>
            <span className="text-3xl ">
              {profile?.records?.modeWords?.twenty !== 200
                ? profile?.records?.modeWords?.twenty
                : "__" || "__"}
            </span>
          </div>
          <div className="flex w-1/4 flex-col items-center justify-center">
            <span className="text-xl text-gray-400">50 words</span>
            <span className="text-3xl ">
              {profile?.records.modeWords?.fifty !== 200
                ? profile?.records.modeWords?.fifty
                : "__" || "__"}
            </span>
          </div>
          <div className="flex w-1/4 flex-col items-center justify-center">
            <span className="text-xl text-gray-400">70 words</span>
            <span className="text-3xl ">
              {profile?.records.modeWords?.seventy !== 200
                ? profile?.records.modeWords?.seventy
                : "__" || "__"}
            </span>
          </div>
          <div className="flex w-1/4 flex-col items-center justify-center">
            <span className="text-xl text-gray-400">100 words</span>
            <span className="text-3xl ">
              {profile?.records.modeWords?.hundred !== 200
                ? profile?.records.modeWords?.hundred
                : "__" || "__"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
