// import panda from "../assets/loader.gif";
import "@dotlottie/player-component";

const Loader = ({ message }) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <dotlottie-player
        src="https://lottie.host/54122e3e-fbdb-47bc-b34f-849fd3530a00/KAeSaVQBpW.json"
        background="transparent"
        speed="1"
        style={{ width: "300px", height: "300px" }}
        loop
        autoplay
      ></dotlottie-player>
      <div className=" flex text-2xl">{message} ....</div>
    </div>
  );
};

export default Loader;
