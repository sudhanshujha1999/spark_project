export const rightPadArray = (arr, desiredLength) => {
    const numberOfSpaces = desiredLength - arr.length;
    return [...arr, ...Array(numberOfSpaces).fill()];
}