const btnUtils = {
  deleteButton: (book) => {
    let index = myLibrary.indexOf(book);
    let btn = document.createElement("button");
    btn.setAttribute("class", "btn btn-sm btn-warning");
    btn.setAttribute("id", "delete-button");
    btn.innerHTML = "Delete";
    btn.addEventListener("click", function () {
      btnUtils.handleDeleteBook(btn, index);
    });
    return btn;
  },

  handleDeleteBook: (btn, index) => {
    let row = btn.parentNode.parentNode;
    myLibrary.splice(index, 1);
    row.parentNode.removeChild(row);
    tableUtils.resetTable();
    tableUtils.addRows(myLibrary);
  },

  toggleReadBtn: (book) => {
    let btn = document.createElement("button");
    btn.setAttribute("class", "btn btn-sm btn-info");
    btn.innerHTML = book.read;

    btn.addEventListener("click", function () {
      if (book.read == true) {
        currentIdx = myLibrary.indexOf(book);
        myLibrary[currentIdx].read = false;
        btn.innerHTML = false;
        tableUtils.resetTable();
        tableUtils.addRows(myLibrary);

        btn.innerHTML = false;
      } else if (book.read == false) {
        currentIdx = myLibrary.indexOf(book);
        myLibrary[currentIdx].read = true;
        btn.innerHTML = true;
        tableUtils.resetTable();
        tableUtils.addRows(myLibrary);
      }
    });

    return btn;
  },
};

const tableUtils = {
  resetTable: () => {
    table = document.getElementById("table");
    tr = table.getElementsByTagName("tr");
    for (let i = tr.length - 1; i >= 1; i--) {
      tr[i].remove();
    }
  },

  createTable: () => {
    let theaders = ["Title", "Author", "Pages", "Read"];

    const table = document.createElement("table");
    table.setAttribute("id", "table");
    table.setAttribute("class", "table-sm table table-dark");

    let tr = table.insertRow(-1);

    theaders.map((item) => {
      let th = document.createElement("th");
      th.setAttribute("class", "col");
      th.innerHTML = item;
      tr.appendChild(th);
    });

    return table;
  },

  addRows: (database) => {
    let table = document.getElementById("table");

    let rowCount = table.rows.length;

    database.map((book, index) => {
      let tr = table.insertRow(rowCount);
      tr.setAttribute("data-row-index", index);

      Object.values(book).map((element, index) => {
        let td = document.createElement("td");
        td = tr.insertCell(index);
        td.innerHTML = element;
        td.setAttribute("id", index);
      });

      let actionTd = document.createElement("td");
      actionTd = tr.insertCell(book.length);

      let deleteButton = btnUtils.deleteButton(book);
      let toggleButton = btnUtils.toggleReadBtn(book);

      deleteButton.setAttribute("data-book-index", index);
      actionTd.appendChild(toggleButton);
      actionTd = tr.insertCell(book.length);
      actionTd.appendChild(deleteButton);
    });
  },
};

const formUtils = {
  showForm: () => {
    let form = document.getElementById("add-book-form");
    form.setAttribute("class", "form-container");
  },

  handleSubmit: (event) => {
    event.preventDefault();
    let form = document.getElementById("add-book-form");
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let read = document.getElementById("read").value;

    data = {
      title,
      author,
      pages,
      read,
    };

    const { validData, errors } = validateUtils.validateInputs(data);

    console.log(Object.values(errors));
    if (
      errors.authorError.length == 0 &&
      errors.titleError.length == 0 &&
      errors.pagesError.length == 0
    ) {
      addBookToLibrary(validData);

      tableUtils.resetTable();
      tableUtils.addRows(myLibrary);
      alert("successfully added the item");
    } else {
      Object.keys(errors).map((key) => {
        if (errors[key] !== []) {
          let span = document.getElementById(key);
          console.log(key);
          span.setAttribute("class", "error-message");
          errors[key].map((error) => (span.innerHTML = error));
        }
      });
      alert("Error while adding the book");
    }
    form.reset();

    form.setAttribute("class", "d-none !important");
  },

  submitForm: () => {
    let form = document.getElementById("add-book-form");
    form.addEventListener("submit", formUtils.handleSubmit);
  },
};

const validateUtils = {
  isEmpty: (data, errors) => {
    data.title ? true : errors.titleError.push("Title can't be blank");
    data.pages ? true : errors.pagesError.push("Pages can't be blank");
    data.author ? true : errors.authorError.push("Author can't be blank");

    return errors;
  },

  validateNum: (num, errors) => {
    if (Number(num) === NaN && num !== "") {
      errors.pagesError.push("Please Insert a number");
    }
    return errors;
  },

  validateInputs: (data) => {
    errors = {
      authorError: [],
      titleError: [],
      pagesError: [],
    };

    errors = validateUtils.isEmpty(data, errors);
    errors = validateUtils.validateNum(data.pages, errors);

    return {
      errors,
      validData: data,
    };
  },
};

let myLibrary = [
  {
    title: "48 laws of power",
    author: "Awesome Raj",
    pages: 45,
    read: false,
  },
  {
    title: "Introduction to programming for newbies",
    author: "Cyrus Kiprop",
    pages: 65,
    read: true,
  },

  {
    title: "Microverse Data Structure",
    author: "Ariel Camus",
    pages: 67,
    read: true,
  },
];

function Book(title, author, pages, read) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(book) {
  // do stuff here
  const newBook = new Book(book.title, book.author, book.pages, book.read);
  myLibrary.push(newBook);

  return myLibrary;
}

function newBook() {
  let btn = document.getElementById("new-book");
  btn.addEventListener("click", formUtils.showForm);
}

const render = () => {
  let div = document.getElementById("container");
  table = tableUtils.createTable();

  div.appendChild(table);

  tableUtils.addRows(myLibrary);

  newBook();

  formUtils.submitForm();
};

render();
