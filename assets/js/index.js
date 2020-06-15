// this is our book store
let myLibrary = [
  {
    title: "lkjlS",
    author: "Subham Raj",
    pages: 45,
    read: false,
  }
];

function Book() {
  // the constructor...
}

function addBookToLibrary(book) {
  // do stuff here

  myLibrary.push(book);
  return myLibrary;
}

function addRows() {
  let table = document.getElementById("table");

  let rowCount = table.rows.length; // first get the number of row in the table
  console.log(rowCount);

  // loop through the data
  myLibrary.forEach((book) => {
    let tr = table.insertRow(rowCount);

    // defining the table cells
    Object.values(book).map((element, index) => {
      let td = document.createElement("td");
      td = tr.insertCell(index);
      td.innerHTML = element;
    });
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

  addRows();
};

render();
