var quill = new Quill('#editor', {
    theme: 'bubble',
    placeholder: '          Start typing stuff here.......It Autosaves.....',
  });
var noteName = window.location.pathname.split("/")[2];
console.log(noteName);

function getNote(){
    fetch("/api/notes/" + noteName)
    .then((response) => {
        return response.json();
     })
    .then((data) => {
        console.log(data);
        if(data.message == "success"){
            context = JSON.parse(data.data.noteData).ops;
            quill.setContents(context);
        }
    });
}

getNote();
var notepad = document.getElementById("editor");
let timeout = null;

notepad.addEventListener('keyup', function (e) {
    document.getElementById("saved").hidden= true;
    document.getElementById("saving").hidden= false;
    document.getElementById("notsaved").hidden= true;
    clearTimeout(timeout);

    timeout = setTimeout(function () {
        console.log('Input Value:', quill.getContents());
        saveNote();
    }, 1000);
});

function saveNote(){
    fetch('/api/notes/' + noteName, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({"notedata" : JSON.stringify(quill.getContents())}),
      })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        document.getElementById("saved").hidden= false;
        document.getElementById("saving").hidden= true;
        document.getElementById("notsaved").hidden= true;
      })
      .catch((error) => {
        console.error('Error:', error);
        document.getElementById("saved").hidden= true;
        document.getElementById("saving").hidden= true;
        document.getElementById("notsaved").hidden= false;
    });
    console.log("Done");
}

var deleteButton = document.getElementById("delete-button");
deleteButton.onclick = function(){
    if(confirm("Are you sure you want to delete this note?")){
        fetch("/api/notes/" + noteName, {
            method: 'DELETE'
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            deleteButton.classList.remove('btn-primary');
            deleteButton.classList.add('btn-success');
            deleteButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
            notepad.innerHTML = "<h2 class='text-light'>Note Deleted</h2>";
            notepad.classList.remove('bg-primary');
            notepad.classList.add('bg-success');
        })
        .catch((err) => {
            console.log(err);
            deleteButton.classList.remove('btn-primary');
            deleteButton.classList.add('btn-danger');
            deleteButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`;
            notepad.innerHTML = "<h2 class='text-light'>An Error Occured</h2>";

        });
    }
}

var copyButton = document.getElementById("copy-url-button");
copyButton.onclick = function(){
    var copyObject = document.createElement('input');
    var copyText = window.location.href;
    document.body.appendChild(copyObject);
    copyObject.value = copyText;
    copyObject.select();
    copyObject.setSelectionRange(0, 99999);
    document.execCommand("copy");
    copyButton.classList.remove('btn-primary');
    copyButton.classList.add('btn-success');
    copyButton.innerHTML = "Copied";
    document.body.removeChild(copyObject);
}