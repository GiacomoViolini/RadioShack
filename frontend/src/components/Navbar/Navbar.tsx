import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        <img src="./public/logo.png" className="w-11 h-11" />{" "}
        <h2 className="text-4xl font-bold">RadioShack</h2>
      </div>
      <div className="flex gap-x-4">
        <button className="bg-white p-3 hover:bg-gray-300 rounded-full flex justify-center items-start" onClick={() => navigate(-1)}>
          <img src="./public/Back.svg" className="w-5 h-5" />
        </button>
        <button className="bg-white p-3 hover:bg-gray-300 rounded-full flex justify-center items-center" onClick={() => navigate("/")}>
          <img src="./public/Home.svg" className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
