class AwesomeBooks {
  constructor() {
    this.addButton = document.querySelector('#add');
    this.listContainer = document.querySelector('.books');
    this.bookAuthor = document.querySelector('#author');
    this.bookTitle = document.querySelector('#title');
    this.list = document.querySelector('#list');
    this.goAddBook = document.querySelector('#add-book');
    this.contact = document.querySelector('#contact');
    this.booksContainer = document.querySelector('.books-container');
    this.inputField = document.querySelector('.input-field');
    this.contactInfo = document.querySelector('.contact-info');
    this.books = [
      {
        author: 'Lorem ipsum',
        title: 'Test Testyy',
      },
      {
        author: 'Second book',
        title: 'Testeroo Testyy',
      },
    ];
    this.deleteBook = function (index, arr) {
      delete arr[index];
      const newBooks = arr.filter((val) => val !== null);
      localStorage.setItem('books', JSON.stringify(newBooks));
    };
  }

  defaultBooks() {
    for (let i = 0; i < this.books.length; i += 1) {
      this.listContainer.innerHTML += `
        <li class="book" id="book${i}">
          <p>${this.books[i].title.toUpperCase()}</p>
          <p>by</p>
          <p>${this.books[i].author.toUpperCase()}</p>
          <button id="${i}" class="remove" type="button">Remove</button>
        </li>`;
    }
    window.btns = document.querySelectorAll('.remove');
  }

  localBooks() {
    const localBooks = JSON.parse(localStorage.getItem('books'));
    for (let i = 0; i < localBooks.length; i += 1) {
      this.listContainer.innerHTML += `
        <li class="book">
          <p>${localBooks[i].title.toUpperCase()}</p>
          <p>by</p>
          <p>${localBooks[i].author.toUpperCase()}</p>
          <button id="${i}" class="remove" type="button">Remove</button>
        </li>`;
    }
    window.btns = document.querySelectorAll('.remove');
  }

  loadBooks() {
    this.list.classList.add('list');
    if (localStorage.getItem('books') === null) {
      this.defaultBooks();
    } else {
      this.localBooks();
    }
  }

  removeButton(btn) {
    const id = Number(btn.id);
    if (localStorage.getItem('books') === null) {
      this.deleteBook(id, this.books);
    } else {
      const storedBooks = JSON.parse(localStorage.getItem('books'));
      this.deleteBook(id, storedBooks);
    }
    window.location.reload();
  }

  addBook() {
    if (this.bookAuthor.value !== '' && this.bookTitle.value !== '') {
      if (localStorage.getItem('books') === null) {
        localStorage.setItem('books', JSON.stringify(this.books));
      }
      const newBooks = JSON.parse(localStorage.getItem('books'));
      const newBook = { author: this.bookAuthor.value, title: this.bookTitle.value };
      newBooks.push(newBook);
      localStorage.setItem('books', JSON.stringify(newBooks));
      this.bookAuthor.value = '';
      this.bookTitle.value = '';
    }
  }

  showList() {
    window.location.reload();
    this.booksContainer.style.display = 'flex';
    this.inputField.style.display = 'none';
    this.contactInfo.style.display = 'none';
    this.list.classList.add('list');
    this.goAddBook.classList.remove('add-book');
    this.contact.classList.remove('contact');
  }

  showAddBook() {
    this.inputField.style.display = 'flex';
    this.booksContainer.style.display = 'none';
    this.contactInfo.style.display = 'none';
    this.goAddBook.classList.add('add-book');
    this.list.classList.remove('list');
    this.contact.classList.remove('contact');
  }

  showContactInfo() {
    this.contactInfo.style.display = 'flex';
    this.booksContainer.style.display = 'none';
    this.inputField.style.display = 'none';
    this.contact.classList.add('contact');
    this.goAddBook.classList.remove('add-book');
    this.list.classList.remove('list');
  }
}

window.addEventListener('load', () => {
  const obj = new AwesomeBooks();
  obj.loadBooks();
  obj.addButton.addEventListener('click', () => {
    obj.addBook();
  });
  const removeButtons = window.btns;
  removeButtons.forEach((n) => n.addEventListener('click', () => {
    obj.removeButton(n);
  }));
  obj.list.addEventListener('click', () => {
    obj.showList();
  });
  obj.goAddBook.addEventListener('click', () => {
    obj.showAddBook();
  });
  obj.contact.addEventListener('click', () => {
    obj.showContactInfo();
  });
});

const today = document.querySelector('#date');
const months = ['January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August', 'September', 'October',
  'November', 'December'];

const d = new Date();
const hours = d.getHours();
const time = hours > 12 ? 'pm' : 'am';
const displayedDate = `${months[d.getMonth()]} ${d.getDate()} ${d.getFullYear()} `;
const displayedTime = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()} ${time}`;
today.innerHTML = `${displayedDate} ${displayedTime}`;
