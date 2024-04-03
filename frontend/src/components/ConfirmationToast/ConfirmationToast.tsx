import { ConfirmationToastProps } from "../../interfaceHelper";

export default function ConfirmationToast({setFlag,setConfirmation,setCounter,toastTitle,subtitle}:ConfirmationToastProps){
    function closeToast(){
        setConfirmation(true);
        setFlag(false);
    }
    function annullamentAggiunta(){
        setFlag(false);
        setCounter(1)
    }
    return(
        <div className=" z-30 h-[100vh] flex justify-center w-full -ml-6 bg-black fixed top-0 bg-opacity-90 backdrop-blur-sm">
            <div className="bg-slate-100 h-44 w-96 rounded-lg z-40 mt-60 flex-row flex">
                <div className="rounded-l-lg h-44 w-2 bg-gray-700 animate-pulse"/>
                <div className="w-full px-8 py-4 flex flex-col">
                    <h1 className="text-2xl text-black font-bold w-full">
                        {toastTitle}
                    </h1>
                    <h2 className="text-lg mt-2 text-black w-full">
                        {subtitle}
                    </h2>
                    <div className="w-full mt-6 flex flex-row items-center gap-4">
                        <button onClick={closeToast} className="bg-gray-700 h-12 w-24 rounded-lg text-white hover:bg-slate-500">
                            Conferma
                        </button>
                        <button onClick={annullamentAggiunta} className="bg-none h-12 w-24 rounded-lg font-semibold text-gray-700 hover:bg-slate-300 hover:text-white">
                            Annulla
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}