import { ConfirmationToastProps } from "../../interfaceHelper";

export default function ConfirmationToast({
  setFlag,
  toastTitle,
  subtitle,
  fetchData
}: ConfirmationToastProps) {
  function closeToast() {
    fetchData();
    setFlag(false);
  }
  function annullamentAggiunta() {
    setFlag(false);
  }

  return (
    <div className=" z-30 h-[100vh] flex justify-center w-full -ml-6 bg-black fixed top-0 bg-opacity-90 backdrop-blur-sm">
      <div className="bg-zinc-800 h-44 w-96 rounded-lg z-40 mt-60 flex-row flex">
        <div className="rounded-l-lg h-44 w-2 bg-slate-100 animate-pulse" />
        <div className="w-full px-8 py-4 flex flex-col">
          <h1 className="text-2xl text-white font-bold w-full">{toastTitle}</h1>
          <h2 className="text-lg mt-2 text-white w-full">{subtitle}</h2>
          <div className="w-full mt-6 flex flex-row items-center gap-4">
            <button
              onClick={closeToast}
              className="bg-slate-100 h-12 w-24 rounded-lg text-black text-bold hover:bg-slate-300"
            >
              Conferma
            </button>
            <button
              onClick={annullamentAggiunta}
              className="bg-none h-12 w-24 rounded-lg font-semibold text-slate-100 hover:bg-slate-200 hover:text-black"
            >
              Annulla
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
