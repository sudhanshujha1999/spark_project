import { useScrimmages } from "./useScrimmages";
import { useState, useEffect } from "react";

export const SCRIMMAGE = "SCRIMMAGE";

export const usePosts = () => {
    const [posts, setPosts] = useState([]);

    const {
        isLoading: scrimmageLoading,
        otherScrimmages,
        setUpdate: updateScrimmages,
    } = useScrimmages();

    useEffect(() => {
        if (!scrimmageLoading) {
            setPosts(otherScrimmages.map((scrimmage) => ({ ...scrimmage, type: SCRIMMAGE })));
        }
    }, [otherScrimmages, scrimmageLoading]);

    return {
        posts,
        isLoading: scrimmageLoading,
        otherScrimmages,
        updateScrimmages,
    };
};
