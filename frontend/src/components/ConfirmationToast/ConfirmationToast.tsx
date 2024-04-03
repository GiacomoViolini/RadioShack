interface ConfirmationToastProps{
    setFlag: React.Dispatch<React.SetStateAction<boolean>>,
    setConfirmation: React.Dispatch<React.SetStateAction<boolean>>,
    title: string,
    subtitle: string
}

export default function ConfirmationToast({setFlag,setConfirmation,title,subtitle}:ConfirmationToastProps){
    function closeToast(){
        setConfirmation(true);
        setFlag(false);
    }
    return(
        <div className=" z-30 h-[100vh] flex justify-center w-full -ml-6 bg-black fixed top-0 bg-opacity-90">
            <div className="bg-slate-100 h-44 w-96 rounded-lg z-40 border-l-8 border-gray-700 border px-8 mt-60 py-4 flex flex-col">
                <h1 className="text-2xl text-black font-bold w-full">
                    {title}
                </h1>
                <h2 className="text-lg mt-2 text-black w-full">
                    {subtitle}
                </h2>
                <div className="w-full mt-6 flex flex-row items-center gap-4">
                    <button onClick={closeToast} className="bg-gray-700 h-12 w-24 rounded-lg text-white hover:bg-slate-500">
                        Confirm
                    </button>
                    <button onClick={()=>setFlag(false)} className="bg-none h-12 w-24 rounded-lg font-semibold text-gray-700 hover:bg-slate-300 hover:text-white">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}