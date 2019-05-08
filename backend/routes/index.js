
const userRoute = require('./user')
const chatRoute = require('./chat')

module.exports = (router) => {
    userRoute(router)
    chatRoute(router)
}