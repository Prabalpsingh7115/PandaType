import { Link } from "react-router-dom";

import linkedin from "../assets/linkedin.png";
import twitter from "../assets/twitter.png";
import leetcode from "../assets/leetcode.png";
import github from "../assets/github.png";
import copyright from "../assets/copyright.png";

const Footer = () => {
  return (
    <div className="fixed bottom-5 flex w-5/6 justify-between px-1 text-[1rem]">
      <div className=" flex w-5/6 items-center justify-start gap-4 ">
        <Link to="https://www.linkedin.com/in/prabapsingh7115/" target="_blank">
          <div className="flex items-center justify-center gap-1">
            <img
              src={linkedin}
              alt="linkedin-logo"
              className="h-4 w-4 opacity-60 invert"
            />
            <span className="pt-1">linkedin</span>
          </div>
        </Link>
        <Link to="https://twitter.com/prabalpsingh71" target="_blank">
          <div className="flex items-center justify-center gap-1">
            <img
              src={twitter}
              alt="twitter-logo"
              className="opacity- h-4 w-4 invert"
            />
            <span className="pt-1">twitter</span>
          </div>
        </Link>
      </div>
      <div className="flex w-5/6 items-center justify-center gap-1">
        <img src={copyright} alt="copyright" className="h-4 w-4 invert" />
        <span className="pt-1 ">PandaType 2024</span>
      </div>
      <div className="flex w-5/6 items-center justify-end gap-5 text-sm">
        <Link
          to="https://github.com/Prabalpsingh7115/PandaType"
          target="_blank"
        >
          <div className="flex items-center justify-center gap-1">
            <img
              src={github}
              alt="github-logo"
              className="h-4 w-4 opacity-60 invert "
            />
            <span className="pt-1">github</span>
          </div>
        </Link>
        <Link to="https://leetcode.com/u/prabalpsingh7115/" target="_blank">
          <div className="flex items-center justify-center gap-1">
            <img
              src={leetcode}
              alt="leetcode-logo"
              className="opacity- h-4 w-4 invert"
            />
            <span className="pt-1">leetcode</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Footer;
