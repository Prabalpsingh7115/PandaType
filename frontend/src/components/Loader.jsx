import panda from "../assets/images/panda.png";

const Loader = ({ message }) => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex-col items-center justify-center">
        <img
          src={panda}
          alt="panda-loader"
          className="h-36 w-36 animate-rotate"
        ></img>
        <div className=" flex text-2xl">{message} ....</div>
      </div>
    </div>
  );
};

export default Loader;
