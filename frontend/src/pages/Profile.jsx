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
import Footer from "../components/Footer";

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

    const [day, month, year] = date.split("/");
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
    <div className="flex h-screen w-5/6 flex-col items-center gap-5 overflow-hidden font-customFont">
      <Header />
      <div className="-mt-5 flex w-full items-center gap-5 rounded-lg bg-background-color py-5">
        <div className="flex w-1/3 flex-col items-center justify-center gap-3">
          <span className="text-4xl text-secondary-color">
            {user?.username}
          </span>
          <span className="text-md text-gray-500 ">
            Joined {dateformat(profile?.joindate.substr(0, 10))}
          </span>
        </div>
        <hr className="h-4/5 w-2 rounded-lg bg-gray-400" />
        <div className="info flex w-2/3">
          <div className="flex w-full flex-col items-start justify-center">
            <span className="text-sm text-gray-500">tests</span>
            <span className="text-4xl text-secondary-color">
              {profile?.tests.tpractices}
            </span>
          </div>
          <div className="flex w-full flex-col items-start justify-start">
            <span className="text-sm text-gray-500">challenges</span>
            <span className="text-4xl text-secondary-color">
              {profile?.tests.tchallenges}
            </span>
          </div>
          <div className="flex w-full flex-col items-start justify-center">
            <span className="text-sm text-gray-500">time typing</span>
            <span className="text-4xl text-secondary-color">
              {timeformat(profile?.tests.ttime)}
            </span>
          </div>
        </div>
      </div>

      <div className=" flex h-1/4 w-full items-center justify-between gap-2">
        <div className="info flex h-full w-full items-center justify-center rounded-lg bg-background-color">
          <div className="flex w-1/4 flex-col items-center justify-center">
            <span className="mb-2 text-sm text-gray-500">15 seconds</span>
            <span className="text-4xl text-secondary-color">
              {profile?.records?.modeTime?.fifteen.wpm !== 0
                ? profile?.records?.modeTime?.fifteen.wpm
                : "_"}
            </span>
            <span className="text-lg text-secondary-color">
              {profile?.records?.modeTime?.fifteen.accuracy !== 0
                ? `${profile?.records?.modeTime?.fifteen.accuracy}%`
                : "_"}
            </span>
          </div>
          <div className="flex w-1/4 flex-col items-center justify-center">
            <span className="mb-2 text-sm text-gray-500">30 seconds</span>
            <span className="text-4xl text-secondary-color">
              {profile?.records?.modeTime?.thirty.wpm !== 0
                ? profile?.records?.modeTime?.thirty.wpm
                : "_"}
            </span>
            <span className="text-lg text-secondary-color">
              {profile?.records?.modeTime?.thirty.accuracy !== 0
                ? `${profile?.records?.modeTime?.thirty.accuracy}%`
                : "_"}
            </span>
          </div>
          <div className="flex w-1/4 flex-col items-center justify-center">
            <span className="mb-2 text-sm text-gray-500">60 seconds</span>
            <span className="text-4xl text-secondary-color">
              {profile?.records?.modeTime?.sixty.wpm !== 0
                ? profile?.records?.modeTime?.sixty.wpm
                : "_"}
            </span>
            <span className="text-lg text-secondary-color">
              {profile?.records?.modeTime?.sixty.accuracy !== 0
                ? `${profile?.records?.modeTime?.sixty.accuracy}%`
                : "_"}
            </span>
          </div>
          <div className="flex w-1/4 flex-col items-center justify-center">
            <span className="mb-2 text-sm text-gray-500">120 seconds</span>
            <span className="text-4xl text-secondary-color">
              {profile?.records?.modeTime?.onetwenty.wpm !== 0
                ? profile?.records?.modeTime?.onetwenty.wpm
                : "_"}
            </span>
            <span className="text-lg text-secondary-color">
              {profile?.records?.modeTime?.onetwenty.accuracy !== 0
                ? `${profile?.records?.modeTime?.onetwenty.accuracy}%`
                : "_"}
            </span>
          </div>
        </div>

        <div className="info flex h-full w-full items-center justify-center rounded-lg bg-background-color p-5">
          <div className="flex w-1/4 flex-col items-center justify-center">
            <span className="mb-2 text-sm text-gray-500">25 words</span>
            <span className="text-4xl text-secondary-color">
              {profile?.records?.modeWords?.twenty.wpm !== 0
                ? profile?.records?.modeWords?.twenty.wpm
                : "_"}
            </span>
            <span className="text-lg text-secondary-color">
              {profile?.records?.modeWords?.twenty.accuracy !== 0
                ? `${profile?.records?.modeWords?.twenty.accuracy}%`
                : "_"}
            </span>
          </div>
          <div className="flex w-1/4 flex-col items-center justify-center">
            <span className="mb-2 text-sm text-gray-500">50 words</span>
            <span className="text-4xl text-secondary-color">
              {profile?.records.modeWords?.fifty.wpm !== 0
                ? profile?.records.modeWords?.fifty.wpm
                : "_"}
            </span>
            <span className="text-lg text-secondary-color">
              {profile?.records.modeWords?.fifty.accuracy !== 0
                ? `${profile?.records?.modeWords?.fifty.accuracy}%`
                : "_"}
            </span>
          </div>
          <div className="flex w-1/4 flex-col items-center justify-center">
            <span className="mb-2 text-sm text-gray-500">70 words</span>
            <span className="text-4xl text-secondary-color">
              {profile?.records.modeWords?.seventy.wpm !== 0
                ? profile?.records.modeWords?.seventy.wpm
                : "_"}
            </span>
            <span className="text-lg text-secondary-color">
              {profile?.records.modeWords?.seventy.accuracy !== 0
                ? `${profile?.records?.modeWords?.seventy.accuracy}%`
                : "_"}
            </span>
          </div>
          <div className="flex w-1/4 flex-col items-center justify-center">
            <span className="mb-2 text-sm text-gray-500">100 words</span>
            <span className="text-4xl text-secondary-color">
              {profile?.records.modeWords?.hundred.wpm !== 0
                ? profile?.records.modeWords?.hundred.wpm
                : "_"}
            </span>
            <span className="text-lg text-secondary-color">
              {profile?.records.modeWords?.hundred.accuracy !== 0
                ? `${profile?.records?.modeWords?.hundred.accuracy}%`
                : "_"}
            </span>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
