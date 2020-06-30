class Book {
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    }
}
class Display {
    add(book) {

        console.log(`adding to ui`);
        let tableBody = document.getElementById('tableBody');
        let uiString = ` <tr>
                          <th scope="row">*</th>
                          <td><b>${book.name}<b></td>
                          <td>${book.author}</td>
                          <td>${book.type}</td>
                     </tr>`;
        tableBody.innerHTML += uiString;
    }
    validate(book) {
        if (book.name.length > 2 || book.author.length > 2) {
            return true;
        } else
            return false;
    }
    clearform() {
        libraryForm.reset();
        console.log(`clearing form`)
    }
    show(status) {
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
}



// Submit event listener
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


    // when ever submit new book object created
    let book = new Book(name, author, typeradio);
    console.log(`submited`);
    console.log(book);

    // display
    let displayBook = new Display();
    if (displayBook.validate(book)) {
        displayBook.add(book);
        displayBook.show('success');
    } else {
        // error
        displayBook.show('error');
    }

    displayBook.clearform();

    e.preventDefault();
}
// remaining work
// Delete function
// local storage