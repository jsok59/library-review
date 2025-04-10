class Book {
    constructor(title, author, pages, isRead = false) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }

    info() {
        if (this.isRead)
            return `${this.title} by ${this.author}, ${this.pages} pages, read`
        else
            return `${this.title} by ${this.author}, ${this.pages} pages, not yet read`
    }
}




function addBookToLibrary(title, author, pages, isRead) {
    myLibrary.push(new Book(title, author, pages, isRead));
}

function removeBookFromLibrary(id) {
    for (let i = 0; i< myLibrary.length; i++) {
        if(myLibrary[i].id===id) {
            myLibrary.splice(i,1);
        } 
    }

}

function displayBooks() {
    for(const book of myLibrary) {
        const div = document.createElement('div');
        div.className = 'card';
        div.setAttribute('id', book.id);
        const pTitle = document.createElement('p');
        pTitle.textContent = book.title;
        const pAuthor = document.createElement('p');
        pAuthor.textContent = book.author;
        const pPages = document.createElement('p');
        pPages.textContent = book.pages + ' pages';
        const pisRead = document.createElement('p');
        if (book.isRead) 
            pisRead.textContent = 'Read';
        else
            pisRead.textContent = 'Not Read';
        div.appendChild(pTitle);
        div.appendChild(pAuthor);
        div.appendChild(pPages);
        div.appendChild(pisRead);
        const button = document.createElement('button');
        button.textContent = 'Delete Book';
        button.addEventListener('click', (e)=> {
            e.target.parentNode.remove();
            removeBookFromLibrary(book.id);
        })
        div.appendChild(button)
        bookContainer.appendChild(div);
    }
}

function showDialog() {
    dialog.showModal();
}

function closeDialog() {
    dialog.close();
}

function clearDisplay() {
    nodelist = document.querySelectorAll('.card');
    for(const node of nodelist) {
        node.remove();
    }
}


const book1 = new Book("The Klaw", 'JSOK', 90, true);
console.log(book1.info());

const myLibrary = [];
const bookContainer = document.querySelector(".book-container");
const dialog = document.querySelector('dialog');
const form = document.querySelector('form');
form.addEventListener('submit', function(e) {
    addBookToLibrary(form.title.value, form.author.value, form.pages.value, form.isRead.checked);
    clearDisplay();
    displayBooks();
})