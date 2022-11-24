module.exports = (date = new Date) => {
    return `${date.getFullYear()}-${addZeroAtFront(date.getMonth() + 1)}-${addZeroAtFront(date.getDate())} ${addZeroAtFront(date.getHours())}:${addZeroAtFront(date.getMinutes())}:${addZeroAtFront(date.getSeconds())}`
}

function addZeroAtFront(number){
    if(number < 10) return `0${number}`
    return `${number}`
}