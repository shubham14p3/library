// Button utilities

const btnUtils = {

    deleteButton: (index) => {
        let btn = document.createElement('button')
        btn.setAttribute('class', 'btn btn-sm btn-warning')
        btn.setAttribute('id', 'delete-button')
        btn.innerHTML = 'Delete'
        btn.addEventListener('click', function() { btnUtils.handleDeleteBook(btn, index) })
        return btn
    },

    handleDeleteBook: (btn, index) => {
        let row = btn.parentNode.parentNode
        myLibrary.splice(index, 1)
        row.parentNode.removeChild(row);
        console.log(index)
        console.log(myLibrary)
    },

    toggleReadBtn: (book) => {
        let btn = document.createElement('button')
        btn.setAttribute('class', 'btn btn-sm btn-info')
        if (book.read == true) {
            btn.innerHTML = 'True'
        } else if (book.read == false) {
            btn.innerHTML = 'False'
        }
        btn.addEventListener('click', function() { btnUtils.handleToggle(book, btn) })

        return btn
    },

    handleToggle: (book, btn) => {
        event.preventDefault()
        if (book.read == true) {
            book.read = false
            btn.innerHTML = 'False'
        }
        if (book.read == false) {
            book.read = true
            btn.innerHTML = 'True'
        }

    },

    print: () => {
        console.log('hello there ')
    }

}

btnUtils.print()

// this is our book store
let myLibrary = [{
        title: "lkjlS",
        author: "Awesome Raj",
        pages: 45,
        read: false,
    },
    {
        title: "lkjlS",
        author: "Iokote",
        pages: 45,
        read: true,
    },

    {
        title: "lkjlS",
        author: "Subhahjhm Raj",
        pages: 45,
        read: true,
    },

];

function Book() {
    // the constructor...
}

function addBookToLibrary(book) {
    // do stuff here

    myLibrary.push(book);
    return myLibrary;
}

const handleNewBook = () => {
    let form = document.getElementById("add-book-form");

    form.setAttribute("class", "d-block !important");
};

const handleSubmit = (event) => {
    event.preventDefault();
    let form = document.getElementById("add-book-form");
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let read = document.getElementById("read").value;

    // reset the fields after the user enters the details
    form.reset()

    data = {
        title,
        author,
        pages,
        read,
    };

    addBookToLibrary(data);
    console.log(myLibrary)
    addRows(myLibrary)

    form.setAttribute("class", "d-none !important");
    //re- render the new data
    alert("successfully added the item");
};

const submitForm = () => {
    let form = document.getElementById("add-book-form");
    form.addEventListener("submit", handleSubmit);
};

// handle the addition of the a new book
function newBook() {
    let btn = document.getElementById("new-book");
    btn.addEventListener("click", handleNewBook);
}

function addRows(database) {
    let table = document.getElementById("table");

    let rowCount = table.rows.length; // first get the number of row in the table
    console.log(rowCount);

    // loop through the data
    database && database.map((book, index) => {
        let tr = table.insertRow(rowCount);
        tr.setAttribute('data-row-index', index)

        // defining the table cells
        Object.values(book).map((element, index) => {
            let td = document.createElement("td");
            td = tr.insertCell(index);
            td.innerHTML = element;
        });

        let actionTd = document.createElement("td")
        actionTd = tr.insertCell(book.length)

        let deleteButton = btnUtils.deleteButton(index);
        let toggleButton = btnUtils.toggleReadBtn(book)

        deleteButton.setAttribute('data-book-index', index)
        actionTd.appendChild(toggleButton)
        actionTd = tr.insertCell(book.length)
        actionTd.appendChild(deleteButton)
    });
}

function newButton() {}

const render = () => {
    let theaders = ["title", "author", "pages", "read"];
    // table
    const table = document.createElement("table");
    // add an id to the table
    table.setAttribute("id", "table");
    table.setAttribute("class", "table-sm table table-dark");

    let tr = table.insertRow(-1);

    // creates the headers of the table

    theaders.forEach((item) => {
        let th = document.createElement("th");
        th.setAttribute("class", "col");
        th.innerHTML = item;
        tr.appendChild(th);
    });

    let div = document.getElementById("container");
    div.appendChild(table);

    addRows(myLibrary);
    newBook();

    submitForm();
};

render();



// some utils