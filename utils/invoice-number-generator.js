module.exports = (userId) => {
    return `${userId.slice(0, 3)}/${new Date().valueOf()}`
}