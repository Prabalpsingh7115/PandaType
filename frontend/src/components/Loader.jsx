// import panda from "../assets/loader.gif";
import "@dotlottie/player-component";

const Loader = ({ message }) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <dotlottie-player
        src="https://lottie.host/89812b21-29e3-428f-9fa2-a2ad19279c2a/qcBnwOeCLI.json"
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
