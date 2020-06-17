const myLibrary = [
  {
    title: '48 laws of power',
    author: 'Awesome Raj',
    pages: 45,
    read: false,
  },
  {
    title: 'Introduction to programming for newbies',
    author: 'Cyrus Kiprop',
    pages: 65,
    read: true,
  },

  {
    title: 'Microverse Data Structure',
    author: 'Ariel Camus',
    pages: 67,
    read: true,
  },
];

const tableUtils = {
  resetTable: () => {
    const table = document.getElementById('table');
    const tr = table.getElementsByTagName('tr');
    for (let i = tr.length - 1; i >= 1; i -= 1) {
      tr[i].remove();
    }
  },

  createTable: () => {
    const theaders = ['Title', 'Author', 'Pages', 'Read'];

    const table = document.createElement('table');
    table.setAttribute('id', 'table');
    table.setAttribute('class', 'table-sm table table-dark');

    const tr = table.insertRow(-1);

    theaders.forEach((item) => {
      const th = document.createElement('th');
      th.setAttribute('class', 'col');
      th.innerHTML = item;
      tr.appendChild(th);
    });

    return table;
  },

  addRows: (database) => {
    const table = document.getElementById('table');

    const rowCount = table.rows.length;

    database.map((book, index) => {
      const tr = table.insertRow(rowCount);
      tr.setAttribute('data-row-index', index);

      Object.values(book).map((element, index) => {
        let td = document.createElement('td');
        td = tr.insertCell(index);
        td.innerHTML = element;
        td.setAttribute('id', index);
        return td;
      });

      let actionTd = document.createElement('td');
      actionTd = tr.insertCell(book.length);

      const deleteButton = btnUtils.deleteButton(book);
      const toggleButton = book && btnUtils.toggleReadBtn(book);

      deleteButton.setAttribute('data-book-index', index);
      actionTd.appendChild(toggleButton);
      actionTd = tr.insertCell(book.length);
      actionTd.appendChild(deleteButton);
      return actionTd;
    });
  },
};

const btnUtils = {
  deleteButton: (book) => {
    // to abstract this code
    const index = myLibrary.indexOf(book);
    const btn = document.createElement('button');
    btn.setAttribute('class', 'btn btn-sm btn-warning');
    btn.setAttribute('id', 'delete-button');
    btn.innerHTML = 'Delete';
    btn.addEventListener('click', () => {
      btnUtils.handleDeleteBook(btn, index);
    });
    return btn;
  },

  handleDeleteBook: (btn, index) => {
    const row = btn.parentNode.parentNode;
    myLibrary.splice(index, 1);
    row.parentNode.removeChild(row);
    tableUtils.resetTable();
    tableUtils.addRows(myLibrary);
  },

  toggleReadBtn: (book) => {
    const btn = document.createElement('button');
    btn.setAttribute('class', 'btn btn-sm btn-info');
    btn.innerHTML = book.read;

    btn.addEventListener('click', () => {
      btnUtils.handleToggle(book, btn);
    });

    return btn;
  },
  handleToggle: (book, btn) => {
    if (book.read === true) {
      const currentIdx = myLibrary.indexOf(book);
      myLibrary[currentIdx].read = false;
      btn.innerHTML = false;
      tableUtils.resetTable();
      tableUtils.addRows(myLibrary);

      btn.innerHTML = false;
    } else if (book.read === false) {
      const currentIdx = myLibrary.indexOf(book);
      myLibrary[currentIdx].read = true;
      btn.innerHTML = true;
      tableUtils.resetTable();
      tableUtils.addRows(myLibrary);
    }
  },
};

const formUtils = {
  showForm: () => {
    const form = document.getElementById('add-book-form');
    form.setAttribute('class', 'form-container');
  },

  handleSubmit: (event) => {
    event.preventDefault();
    const form = document.getElementById('add-book-form');
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = JSON.parse(document.getElementById('read').value);

    const data = {
      title,
      author,
      pages,
      read,
    };

    const { validData, errors } = validateUtils.validateInputs(data);

    const { authorError, pagesError, titleError } = errors;
    if (
      authorError.length === 0
      && titleError.length === 0
      && pagesError.length === 0
    ) {
      const newData = addBookToLibrary(validData);

      tableUtils.resetTable();
      tableUtils.addRows(newData);
    } else {
      Object.keys(errors).forEach((key) => {
        if (errors[key] !== []) {
          const span = document.getElementById(key);
          span.setAttribute('class', 'error-message');
          errors[key].map((error) => {
            span.innerHTML = error;
            return span;
          });
        }
      });
    }
    form.reset();

    form.setAttribute('class', 'd-none !important');
  },

  submitForm: () => {
    const form = document.getElementById('add-book-form');
    form.addEventListener('submit', formUtils.handleSubmit);
  },
};

const validateUtils = {
  isEmpty: (data, errors) => {
    const { title, pages, author } = data;
    const { titleError, pagesError, authorError } = errors;

    if (!title) titleError.push("Title can't be blank");
    if (!pages) pagesError.push("Pages can't be blank");
    if (!author) authorError.push("Author can't be blank");

    return errors;
  },

  validateNum: (num, errors) => {
    if (Number.isNaN(num)) errors.pagesError.push('Please Insert a number');
    return errors;
  },

  validateInputs: (data) => {
    let errors = {
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
  const btn = document.getElementById('new-book');
  btn.addEventListener('click', formUtils.showForm);
}

const render = () => {
  const div = document.getElementById('container');
  const table = tableUtils.createTable();

  div.appendChild(table);

  tableUtils.addRows(myLibrary);

  newBook();

  formUtils.submitForm();
};

render();
