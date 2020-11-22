import { useLocation } from 'react-router-dom';

export const useQueryParams = () => {
    const queryObj = new URLSearchParams(useLocation().search);
    return [...queryObj.entries()].reduce((acc, entry) => ({
        ...acc,
        [entry[0]]: entry[1],
    }), {});
};