const {User, Thought} = require('../models');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId})
            .select(`-__V`);

            if (!thought) {
                return res.status(404).json({message: 'No thought with that ID'});
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId});
            
            if (!thought) {
                res.status(404).json({ message: 'No thought with this ID'});
            }
            res.json({message: 'Thought gone, brain empty'});
        }   catch (err) {
            res.status(500).json(err);
        }
    },

    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
    
            if (!thought) {
                res.status(404).json({ message: 'No thought with this id!' });
            }
    
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async addReaction(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate (
                { _id: req.params.thoughtId },
                { $addToSet: { reaction: req.body } },
                { runValidators: true, new: true }
            );
            if (!thought) {
                return res.status(404).json({ message: 'Where he go? Hes gone!'});
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async removeReaction(res, req) {
        try {
            const thought = await Thought.findByIdAndUpdate (
                { _id: req.params.thoughtId },
                { $addToSet: { reaction: req.body } },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'The head is there, but there is no thought'})
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    }

}