import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [scrollState, setScrollState] = useState("top");

  const handleScroll = () => {
    const scrolled = document.scrollingElement?.scrollTop ?? 0;
    if (scrolled > 0) {
      if (scrollState !== "scrolling") setScrollState("scrolling");
    } else {
      if (scrollState !== "top") setScrollState("top");
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [scrollState]);

  return (
    <div className={`flex items-center justify-between fixed top-0 start-0 h-20 pl-8 w-full pr-12 mb-6 z-20 ${scrollState === "top" ? "" : "bg-white"}`}>
      <div className="flex items-center gap-4">
        <img src={`./public/${scrollState === "top" ? "logo.png" : "LogoBlack.svg"}`} className="w-11 h-11" />{" "}
        <h2 className={`text-4xl font-bold ${scrollState === "top" ? "" : "text-black"}`}>RadioShack</h2>
      </div>
      <div className="flex gap-x-4">
        <button className={`p-3 hover:bg-gray-300 rounded-full flex justify-center items-start ${scrollState === "top" ? "bg-white" : "bg-black"}`} onClick={() => navigate(-1)}>
          <img src={`./public/${scrollState === "top" ? "Back.svg" : "BackWhite.svg"}`} className="w-5 h-5" />
        </button>
        <button className={`p-3 hover:bg-gray-300 rounded-full flex justify-center items-center ${scrollState === "top" ? "bg-white" : "bg-black"}`} onClick={() => navigate("/")}>
          <img src={`./public/${scrollState === "top" ? "Home.svg" : "HomeWhite.svg"}`} className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}