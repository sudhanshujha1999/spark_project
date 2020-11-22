import { useLocation, useHistory } from 'react-router-dom';

const objToQueryParams = obj =>
    Object.keys(obj)
        .map(key => `${key}=${obj[key]}`)
        .join('&');

export const useQueryParam = (name) => {
    const history = useHistory();
    const location = useLocation();
    const queryObj = new URLSearchParams(location.search);
    const hash = [...queryObj.entries()].reduce((acc, entry) => ({
        ...acc,
        [entry[0]]: entry[1],
    }), {});

    const setQuery = newValue => {
        const newParams = { ...hash, [name]: newValue };
        const newUrl = location.pathname + '?' + objToQueryParams(newParams);
        history.push(newUrl);
    };
    
    return [hash[name], setQuery];
}