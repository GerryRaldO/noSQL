const {User, Thought} = require('../models');

module.exports = {
    //Get ALL USERS
    async getUsers(req, res) {
        try {
            const users = await User.find();
    
        res.json(users);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    //Get single moms in your area
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne ({ _id: req.params,studentId})
                .select('-__V');
            
            if (!user) {
                return res.status(404).json({ message: 'No People, He disconnected'})
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Create new User

    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //Delete user by ID
    async deleteUser(req, res) {
        try {
            const user = await User.findByIdAndDelete({ _id: req.params.studentId})

            if (!user) {
                return res.status(404).json({ message: 'WHERE HE GO? WE CANT FIND HIM'})
            }
            res.json ({ message: 'He done. OUTTA HERE'});
        } catch (err){
            res.status(500).json(err);
        }
    },

    async updateUser (req, res) {
        try {
            const user = await User.findByIdAndUpdate(
                { _id: req.params.userId },
                { $set: req.body  },
                { runValidators: true, new: true }
            );

            if (!user) {
                res.status(404).json({message: 'User not found'})
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    }


}