export const getDate = () => {
    let date = new Date().getDate()
    let year = new Date().getFullYear()
    let month = new Date().getMonth() + 1
    let hour = new Date().getHours()
    let min = new Date().getMinutes()
    let minute = min < 10 ? `0${min}` : min
    let fullDate = `${year}/${month}/${date}  ${hour}:${minute}`
    return fullDate
}
export const setDate = () => {
    let date = new Date().getDate()
    let newDate = new Date(new Date().setDate(new Date().getDate() + 3))
    let year = new Date().getFullYear()
    let month = new Date().getMonth() + 1
    let hour = new Date().getHours()
    let min = new Date().getMinutes()
    let minute = min < 10 ? `0${min}` : min
    let fullDate = `${year}/${month}/${newDate}  ${hour}:${minute}`
    return fullDate
}