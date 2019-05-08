const User = require('../models/user.js')

module.exports = {
    signin: (req, res) => {
        User.findOne(req.body, (err, data) => {
            if (err || !data) return res.json({ success: false, error: err || "No user found!" });
            return res.json({ success: true, user: data });
        })
    },
    signup: (req, res) => {

        const user = new User();
        const { username, password } = req.body;
        if (!username || !password) {
            return res.json({
                success: false,
                error: "INVALID INPUTS"
            });
        }
        user.username = username
        user.password = password
        user.save(err => {
            if (err) return res.json({ success: false, error: err });
            return res.json({ success: true });
        });

    }
}