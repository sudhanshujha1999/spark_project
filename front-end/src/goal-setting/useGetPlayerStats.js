import { useState, useEffect } from "react";
import axios from "axios";

export const useGetPlayerStats = (playerId) => {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const {
                    data: { match },
                } = await axios.get("/api/test-match");
                setMatches(match);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        };
        // if(playerId){

        // }
        fetchData();
    }, []);

    return { matches, loadingMatches: loading };
};
