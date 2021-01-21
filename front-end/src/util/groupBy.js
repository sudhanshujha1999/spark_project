export const groupBy = (perGroup, arr) => {
    const numberOfGroups = Math.ceil(arr.length / perGroup);
    return Array(numberOfGroups).fill().map((_, i) => arr.slice(i * perGroup, (i + 1) * perGroup - 1));
}