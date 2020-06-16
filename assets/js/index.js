// Button utilities

const btnUtils = {

    deleteButton: (book) => {
        let index = myLibrary.indexOf(book)
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
        tableUtils.resetTable()
        addRows(myLibrary)
    },

    toggleReadBtn: (book) => {

        let btn = document.createElement('button')
        btn.setAttribute('class', 'btn btn-sm btn-info')
        btn.innerHTML = book.read

        btn.addEventListener('click', function() {
            if (book.read == true) {
                currentIdx = myLibrary.indexOf(book)
                myLibrary[currentIdx].read = false
                btn.innerHTML = false
                tableUtils.resetTable()
                addRows(myLibrary)
                //  update the read section of the table


                btn.innerHTML = false
            } else if (book.read == false) {
                currentIdx = myLibrary.indexOf(book)
                myLibrary[currentIdx].read = true
                btn.innerHTML = true
                tableUtils.resetTable()
                addRows(myLibrary)
            }
        })

        return btn
    },
}


const tableUtils = {
    resetTable: () => {
        table = document.getElementById('table')
        tr = table.getElementsByTagName('tr')
        for (let i = tr.length - 1; i >= 1; i--) {
            tr[i].remove()
        }
    },

    createTable: () => {
        let theaders = ["title", "author", "pages", "read"];

        const table = document.createElement("table");
        table.setAttribute("id", "table");
        table.setAttribute("class", "table-sm table table-dark");

        let tr = table.insertRow(-1);

        // creates the headers of the table
        theaders.map((item) => {
            let th = document.createElement("th");
            th.setAttribute("class", "col");
            th.innerHTML = item;
            tr.appendChild(th);
        });

        return table
    }
}

// this is our book store
let myLibrary = [{
        title: "48 laws of power",
        author: "Awesome Raj",
        pages: 45,
        read: false,
    },
    {
        title: "Introduction to programming for newbies",
        author: "Iokote",
        pages: 45,
        read: true,
    },

    {
        title: "Welcome to Microverse",
        author: "Subhahjhm Raj",
        pages: 45,
        read: true,
    },

];

function Book(title, author, pages, read) {
    // the constructor...
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

function addBookToLibrary(book) {
    // do stuff here
    const newBook = new Book(book.title, book.author, book.pages, book.read)
    myLibrary.push(newBook);

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
    // reset the dom
    tableUtils.resetTable()
    addRows(myLibrary)
    // addRows(myLibrary)

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

    // loop through the data
    // rendering the data stuff
    database.map((book, index) => {
        let tr = table.insertRow(rowCount);
        tr.setAttribute('data-row-index', index)

        // defining the table cells
        Object.values(book).map((element, index) => {
            let td = document.createElement("td");
            td = tr.insertCell(index);
            td.innerHTML = element;
            td.setAttribute('id', index)
        });

        let actionTd = document.createElement("td")
        actionTd = tr.insertCell(book.length)

        let deleteButton = btnUtils.deleteButton(book);
        let toggleButton = btnUtils.toggleReadBtn(book)

        deleteButton.setAttribute('data-book-index', index)
        actionTd.appendChild(toggleButton)
        actionTd = tr.insertCell(book.length)
        actionTd.appendChild(deleteButton)
    });
}

function newButton() {}

const render = () => {

    let div = document.getElementById("container");
    table = tableUtils.createTable()

    div.appendChild(table);

    addRows(myLibrary);

    newBook();

    submitForm();
};

render();



// some utils