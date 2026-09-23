//Dialog
const updateButton = document.getElementById("updateDetails");
const cancelButton = document.getElementById("cancel");
const bookForm = document.querySelector(".book-form");
const bookDialog = document.getElementById("book-dialog");

//Books 
const booksGrid = document.querySelector('.books-grid')
const inputTitle = document.getElementById('info-title')
const inputAuthor = document.getElementById('info-author')
const inputPages = document.getElementById('info-pages')
const inputRead = document.getElementById('info-read')



const myLibrary = [];


// Constructor 
function Book() {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.id = crypto.randomUUID();
    this.title = '';
    this.author = '';
    this.pages = '';
    this.read = true
}


Book.prototype.alternateRead = function () {
    this.read = !this.read
}


function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book()
    newBook.title = title;
    newBook.author = author;
    newBook.pages = pages;
    newBook.read = read;

    myLibrary.push(newBook)
}

addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, false);
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, true);
addBookToLibrary("Pride and Prejudice", "Jane Austen", 279, false);

//Renderizado de Books
const renderBooks = () => {
    booksGrid.innerHTML = myLibrary
        .map((book) => {
            return `
        <div class="book-card" data-id="${book.id}">
          <h4 class="card-title">${book.title}</h4>
          <span class="card-author">${book.author}</span>
          <span class="card-pages">${book.pages}</span>
          <span class="card-read">
            ${book.read ? "Read" : "Unread"}
          </span>

          <div class="actions">
            <button class="delete">Delete</button>
           <button class="mark-read">${book.read ? "Mark as Unread" : "Mark as Read"}</button>
          </div>
        </div>
      `;
        })
        .join("");

    const buttonsRead = document.querySelectorAll('.mark-read')
    buttonsRead.forEach((button) => {
        button.addEventListener('click', (event) => {
            const bookCard = event.target.closest('.book-card')
            const idBook = bookCard.dataset.id;

            const bookSelected = myLibrary.find(book => book.id === idBook);

            if (bookSelected) {
                bookSelected.alternateRead()
                renderBooks()
            }
        })
    })

    const buttonDelete = document.querySelectorAll('.delete')
    buttonDelete.forEach((button) => {
        button.addEventListener('click', (event) => {
            const bookCard = event.target.closest('.book-card')

            const idBook = bookCard.dataset.id;

            const index = myLibrary.findIndex(book => book.id === idBook)
            myLibrary.splice(index, 1)
            renderBooks()
        })
    })
};

renderBooks()

//AddEventListeners 
updateButton.addEventListener("click", () => {
    bookDialog.showModal();
});

cancelButton.addEventListener("click", () => {
    bookDialog.close();
});

bookForm.addEventListener("submit", (event) => {
    event.preventDefault()

    const title = inputTitle.value.trim();
    const author = inputAuthor.value.trim();
    const pages = inputPages.value.trim();
    const read = inputRead.value === "read";

    addBookToLibrary(title, author, pages, read);
    bookForm.reset();
    bookDialog.close();
    renderBooks()
})