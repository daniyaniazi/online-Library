// constructor book
// console.log(firebase)
// // ---------RELOAD DISPLAY-----------------------------
function reload() {
    firebase.database().ref('books').on('child_added', function(data) {
        let tableBody = document.getElementById('tableBody');
        var key = data.val().key
        let uiString = `  <tr id='${key}'>
                         <td>key</td>
                         <td><b>${data.val().name}<b></td>
                          <td>${data.val().author}</td>
                          <td>${data.val().type}</td>
                          <td><button class='btn btn-danger' id='${key}' onclick="delBook(this)">del</button></td>
                          </tr>`;
        tableBody.innerHTML += uiString;
    })
}
reload()
    // ----------------------------------------
function Book(name, author, type, key) {
    this.name = name;
    this.author = author;
    this.type = type;
    this.key = key
}
// DISPLAY CONSTRUCTOR
function Display() {}
//----> clear form
Display.prototype.clearform = function() {
    libraryForm.reset();
    // console.log(`clearing form`)
    // reseting form;
};
// ---->  validate
Display.prototype.validate = function(book) {
    if (book.name.length > 2 || book.author.length > 2) {
        return true;
    } else
        return false;
};
// ----> show
Display.prototype.show = function(status) {
        let message = document.getElementById('statusmessage')
        if (status == 'success') {
            message.innerHTML = `<div class="alert alert-success" role="alert">
        <b>Success</b> Your book is succesfully added!
      </div>`;
        } else if (status == 'error') {
            message.innerHTML = `<div class="alert alert-danger" role="alert">
        <b>Sorry</b > You may have not given proper name
      </div>`;
        }
        setTimeout(function() {
            message.innerHTML = '';
        }, 2000);
    }
    // ---->  Submit event listener
let libraryForm = document.getElementById('library-form');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    let name = document.getElementById('bookname').value;
    let author = document.getElementById('authorname').value;
    let typeradio;

    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('computerProgramming');
    let cooking = document.getElementById('cooking');

    if (fiction.checked) {
        typeradio = fiction.value;

    } else if (programming.checked) {
        typeradio = programming.value;
    } else if (cooking.checked) {
        typeradio = cooking.value;
    }
    // ---->  when ever submit new book object created
    var ref = firebase.database().ref('books')
    var key = ref.push().key
    let book = new Book(name, author, typeradio, key);
    ref.child(key).set(book)
        //---->  display
    let displayBook = new Display();
    if (displayBook.validate(book)) {
        displayBook.show('success');
        // reload()
    } else {
        // error
        displayBook.show('error');
    }
    displayBook.clearform();
    e.preventDefault();
}

function delBook(e) {
    console.log(e.id)
    key = e.id
    firebase.database().ref('books').child(e.id).remove()
    e.parentNode.parentNode.remove()

}