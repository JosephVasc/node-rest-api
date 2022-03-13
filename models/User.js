const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        min: 3,
        maxi: 20,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        max: 50,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        unique: true,
        min: 4,
    },
    profilePicture:{
        type: String,
        default: ""
    },
    followers:{
        type: Array,
        default: []
    },
    fololowing:{
        type: Array,
        default: []
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    description:{
        type: String,
        max: 50,
    },
    city :{
        type: String,
        max: 50,
    },
    country:{
        type: String,
        max: 50,
    },
    relationship: {
        type: Number, 
        enum:[0,1,2],
    }
}, {timestamps: true});


module.exports = mongoose.model('User', UserSchema);