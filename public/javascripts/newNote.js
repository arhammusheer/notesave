document.querySelector('#note-name-input').focus();
document.querySelector('#note-name-input').onkeyup = function(e) {
    if (e.keyCode === 13) {  // enter, return
        document.querySelector('#note-name-submit').click();
    }
};

document.querySelector('#note-name-submit').onclick = function(e) {
    var roomName = document.querySelector('#note-name-input').value;
    window.location.pathname = '/notepad/' + roomName;
};