var fs = require('fs')
var findForder = './post'

fs.readdir(findForder, function(error, filelist){
    console.log(filelist)

})