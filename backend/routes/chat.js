const chatController = require('../controllers/chat.js')

module.exports = (router) => {

    router.route('/chat/').post(chatController.create)
    router.route('/chat/').get(chatController.search)
    router.route('/chat/count').get(chatController.count)

}