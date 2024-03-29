import { useEffect, useState} from "react";
import axios from "axios";

export default function Statistiche() {
    const [data, setData] = useState("");

    useEffect(() => {
        async function fetchData() {
            const temp = await axios.get("http://127.0.0.1:8000/radioapp/a");
            setData(temp.data.message);
        }

        fetchData();
    }, []);

    return (
        <div>
            <h1>{data}</h1>
        </div>
    );
}
