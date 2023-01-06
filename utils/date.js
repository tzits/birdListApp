export const setMinutes = (dateTime) => {
    if (dateTime.getMinutes() < 10) {
        return `0${dateTime.getMinutes()}`
    }
    else {
        return `${dateTime.getMinutes()}`
    }
}