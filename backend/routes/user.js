const userController = require('../controllers/user.js')

module.exports = (router) => {

    router.route('/user/signin').post(userController.signin)
    router.route('/user/signup').post(userController.signup)

}