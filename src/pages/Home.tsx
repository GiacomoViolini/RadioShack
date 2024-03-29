import { useNavigate } from "react-router-dom";
import "../pagestyles/Home.css"

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
  function navigateTo(url: string) {
    navigate(`/${url}`);
  }

  return (
    <div className="flex flex-col justify-center items-center h-full m-10">
      <div className="grid grid-cols-3 gap-x-40 gap-y-4">
        <div className="relative flex flex-col items-center">
          <img
            src="./public/Prodotti.svg"
            className="home-image"
            onClick={() => navigateTo(routes[0])}
          />
          <h2 className="text-2xl mt-2 font-bold">{routes[0][0].toUpperCase() + routes[0].slice(1)}</h2>
        </div>
        <div className="flex flex-col items-center">
          <img
            src="./public/Prodotti.svg"
            className="home-image "
            onClick={() => navigateTo(routes[1])}
          />
          <h2 className="text-2xl mt-2 font-bold">{routes[1][0].toUpperCase() + routes[1].slice(1)}</h2>
        </div>
        <div className="flex flex-col items-center">
          <img
            src="./public/Prodotti.svg"
            className="home-image "
            onClick={() => navigateTo(routes[2])}
          />
          <h2 className="text-2xl mt-2 font-bold">{routes[2][0].toUpperCase() + routes[2].slice(1)}</h2>
        </div>
        <div className="flex flex-col items-center">
          <img
            src="./public/Prodotti.svg"
            className="home-image "
            onClick={() => navigateTo(routes[3])}
          />
          <h2 className="text-2xl mt-2 font-bold">{routes[3][0].toUpperCase() + routes[3].slice(1)}</h2>
        </div>
        <div className="flex flex-col items-center">
          <img
            src="./public/Prodotti.svg"
            className="home-image "
            onClick={() => navigateTo(routes[4])}
          />
          <h2 className="text-2xl mt-2 font-bold">{routes[4][0].toUpperCase() + routes[4].slice(1)}</h2>
        </div>
        <div className="flex flex-col items-center">
          <img
            src="./public/Prodotti.svg"
            className="home-image "
            onClick={() => navigateTo(routes[5])}
          />
          <h2 className="text-2xl mt-2 font-bold">{routes[5][0].toUpperCase() + routes[5].slice(1)}</h2>
        </div>
      </div>
    </div>
  );
}
