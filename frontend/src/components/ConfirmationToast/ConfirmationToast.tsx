import { ConfirmationToastProps } from "../../interfaceHelper";

export default function ConfirmationToast({
  setFlag,
  toastTitle,
  subtitle,
  fetchData,
}: ConfirmationToastProps) {
  async function closeToast() {
    await fetchData();
    setFlag(false);
  }
  function annullamentAggiunta() {
    setFlag(false);
  }

  return (
    <div className="z-30 h-screen flex justify-center items-center w-full fixed top-0 left-0 bg-opacity-90 bg-black backdrop-blur">
      <div
        className={`bg-zinc-800 rounded-lg z-40 flex`}
      >
        <div className="rounded-l-lg w-2 bg-zinc-100 animate-pulse" />
        <div className="px-8 py-4 flex flex-col gap-2">
          <h1 className={`text-2xl text-white font-bold`}>
            {toastTitle}
          </h1>
          <h2 className="text-lg">{subtitle}</h2>
          <div className="mt-4 flex items-center justify-between">
            <button
              onClick={closeToast}
              className="bg-zinc-100 h-12 w-24 rounded-lg text-black text-bold hover:bg-zinc-400 transition-all duration-200"
            >
              Conferma
            </button>
            <button
              onClick={annullamentAggiunta}
              className="h-12 w-24 rounded-lg font-semibold hover:bg-zinc-200 hover:text-black transition-all duration-200"
            >
              Annulla
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
