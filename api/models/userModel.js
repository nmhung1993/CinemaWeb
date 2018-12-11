const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
// const db = require('/CinemaWeb/utils/db');
// const autoIncrement = require('mongoose-auto-increment');

var userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    userName: { type: String, required: true },
    password: { type: String, required: true },
    avatarURL: { type: String },
	dateAdded : { type: Date, default: Date.now() }
})

const User = mongoose.model('User', userSchema);
// autoIncrement.initialize(mongoose.connection);
// userSchema.plugin(autoIncrement.plugin, { model: 'User', field: 'userID' });

module.exports = {
    User
};