const Chat = require('../models/chat.js')
const User = require('../models/user.js')

module.exports = {
    count: (req, res) => {
        Chat.aggregate([
            { $group: { _id: '$userId', count: { $sum: 1 } } },
            {
                $lookup:
                  {
                    from: 'users',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'user'
                  }
             },
             {
                $project:
                 {
                     _id: 0,
                    count: 1,
                    username: { $arrayElemAt: [ "$user.username", 0 ] }
                 }
              }
        ], (err, data) => {
            if (err) return res.json({ success: false, error: err });
            return res.json({ success: true, countData: data });
        })
    },
    search: (req, res) => {
        Chat.aggregate([
            {
                $lookup:
                  {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user'
                  }
             },
             {
                $project:
                 {
                     _id: 0,
                    message: 1,
                    username: { $arrayElemAt: [ "$user.username", 0 ] }
                 }
              }
        ]
            ,(err, data) => {
            if (err) return res.json({ success: false, error: err });
            return res.json({ success: true, chat: data });
        })
    },
    create: (req, res) => {

        const chat = new Chat();
        const { message, userId } = req.body;
        if (!message || !userId) {
            return res.json({
                success: false,
                error: "INVALID INPUTS"
            });
        }
        chat.message = message
        chat.userId = userId
        chat.save(err => {
            if (err) return res.json({ success: false, error: err });
            return res.json({ success: true });
        });
    }
}