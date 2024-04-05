import { useNavigate } from "react-router-dom";
import "../pagestyles/Home.css";

export default function Home() {
  const navigate = useNavigate();
  const routes: string[] = [
    "prodotti",
    "statistiche",
    "fornitori",
    "clienti",
    "acquisti",
    "vendite",
  ];
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;
  function navigateTo(url: string) {
    navigate(`/${url}`);
  }

  return (
    <div className="flex flex-col justify-center h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <img src="/logo.png" className="w-11 h-11" />{" "}
          <h2 className="text-4xl font-bold">RadioShack</h2>
        </div>
        <h2 className="text-xl font-semibold">{date}</h2>
      </div>
      <div className="grid grid-cols-3 gap-x-32 gap-y-4">
        <div className="relative flex flex-col items-center">
          <img
            src="/Prodotti.svg"
            className="home-image hover:bg-purple-500"
            onClick={() => navigateTo(routes[0])}
          />
          <h2 className="home-text">
            {routes[0][0].toUpperCase() + routes[0].slice(1)}
          </h2>
        </div>
        <div className="flex flex-col items-center">
          <img
            src="/Statistiche.svg"
            className="home-image hover:bg-blue-500 "
            onClick={() => navigateTo(routes[1])}
          />
          <h2 className="home-text">
            {routes[1][0].toUpperCase() + routes[1].slice(1)}
          </h2>
        </div>
        <div className="flex flex-col items-center">
          <img
            src="/Fornitori.svg"
            className="home-image hover:bg-emerald-500 "
            onClick={() => navigateTo(routes[2])}
          />
          <h2 className="home-text">
            {routes[2][0].toUpperCase() + routes[2].slice(1)}
          </h2>
        </div>
        <div className="flex flex-col items-center">
          <img
            src="/Clienti.svg"
            className="home-image hover:bg-amber-500 "
            onClick={() => navigateTo(routes[3])}
          />
          <h2 className="home-text">
            {routes[3][0].toUpperCase() + routes[3].slice(1)}
          </h2>
        </div>
        <div className="flex flex-col items-center">
          <img
            src="/Acquisti.svg"
            className="home-image hover:bg-pink-500 "
            onClick={() => navigateTo(routes[4])}
          />
          <h2 className="home-text">
            {routes[4][0].toUpperCase() + routes[4].slice(1)}
          </h2>
        </div>
        <div className="flex flex-col items-center">
          <img
            src="/Vendite.svg"
            className="home-image hover:bg-red-500"
            onClick={() => navigateTo(routes[5])}
          />
          <h2 className="home-text">
            {routes[5][0].toUpperCase() + routes[5].slice(1)}
          </h2>
        </div>
      </div>
    </div>
  );
}
