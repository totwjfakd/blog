var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var postdSchema = new Schema({
    title: String,
    contents: String,
    post_date: {type: Date, default: Date.now()},
});
 
module.exports = mongoose.model('board', postdSchema);