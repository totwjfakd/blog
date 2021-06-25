var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = new Schema({
	password: String, // 비밀번호
	name: String, // 이름
	email: String, // 아이디
});
 
module.exports = mongoose.model('user', userSchema);