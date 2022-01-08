// This function will help get ID from youtube links
function ytgetID(url) {
    var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    
    if (match && match[2].length == 11) {
        return match[2];
    }
}

module.exports.ytgetID = ytgetID