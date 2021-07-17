import { useScrimmages } from "./useScrimmages";

export const usePosts = () => {
    const {
        isLoading: scrimmageLoading,
        otherScrimmages,
        setUpdate: updateScrimmages,
    } = useScrimmages();

    return { isLoading: scrimmageLoading, otherScrimmages, updateScrimmages };
};
