const {Schema, model} = require('mongoose');


const userSchema = new Schema (
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trimmed: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}/, "Must be a valid email"]
        },
        thoughts: {
            type: Schema.Types.ObjectId,
            ref: 'Thought',
        },
        friends: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

userSchema.virtual('friendsCount').get(function() {
    return this.friends.length
});

const User = model('user', userSchema);
module.exports = User;