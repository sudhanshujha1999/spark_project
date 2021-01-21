export const leftPadArray = (arr, desiredLength) => {
    const numberOfSpaces = desiredLength - arr.length;
    return [...Array(numberOfSpaces).fill(), ...arr];
}