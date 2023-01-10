export const setMinutes = (dateTime) => {
    if (dateTime.getMinutes() < 10) {
        return `0${dateTime.getMinutes()}`
    }
    else {
        return `${dateTime.getMinutes()}`
    }
}

export const setMyDate = (dateTime) => {
    let date = `${dateTime.getDate()}/${dateTime.getMonth()+1}/${dateTime.getFullYear()}`
    return date
}

export const setMyTime = (dateTime) => {
    let time = `${dateTime.getHours()}:${setMinutes(dateTime)}`
    return time
}
