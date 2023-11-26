//importing data from data.js file.

import { BOOKS_PER_PAGE, books, authors, genres } from "./data.js";

let page = 1;
//creating fragments to easily attach to HTML.

const booksFragment = document.createDocumentFragment()
const searchesFragment = document.createDocumentFragment()
const authorsFragment = document.createDocumentFragment()
const genresFragment = document.createDocumentFragment()

//Data management

//search constants

const searchOverlay = document.querySelector("[data-search-overlay]");
const searchForm = document.querySelector("[data-search-form]");
const searchCancel = document.querySelector("[data-search-cancel]");
const searchTitle = document.querySelector("[data-search-title]");
const searchGenres = document.querySelector("[data-search-genres]");
const searchAuthors = document.querySelector("[data-search-authors]");
const searchHeader = document.querySelector("[data-header-search]");

//Settings constants

const settingsform = document.querySelector("[data-settings-form]");
const settingscancel = document.querySelector("[data-settings-cancel]");
const settingstheme = document.querySelector("[data-settings-theme]");
const settingsoverlay = document.querySelector("[data-settings-overlay]");
const settingsHeader = document.querySelector("[data-header-settings]");

//List constants

const listItems = document.querySelector("[data-list-items]");
const listMessage = document.querySelector("[data-list-message]");
const listActive = document.querySelector("[data-list-active]");
const listImage = document.querySelector("[data-list-image]");
const listBlur = document.querySelector("[data-list-blur]");
const listTitle = document.querySelector("[data-list-title]");
const listSubtitle = document.querySelector("[data-list-subtitle]");
const listDescription = document.querySelector("[data-list-description]");
const listButton = document.querySelector("[data-list-button]");
const listClose = document.querySelector("[data-list-close]");

//Number of books to show a page after loading....

let firstLoadBooks = [];

const getFirstBooks = (booksArray) => {
    firstLoadBooks = booksArray.slice(0, BOOKS_PER_PAGE);
    return firstLoadBooks
}

getFirstBooks(books);

const bookProperties = ({author, title, id, image }) => {
    const bookPreviewButton = document.createElement('button');
    bookPreviewButton.classList.add('preview');
    bookPreviewButton.setAttribute('previewBook-Id', id);
    bookPreviewButton.innerHTML = 
        `<img class = 'preview__image' scr = '${image}'?>
         <div class = 'preview__info'> 
              <h3 class = 'preview__title'> ${title}</h3>
              <div class = 'preview__author'> ${authors[author]}`
  return bookPreviewButton;
};

const getBooks = (booksArray, appendSegment) => {

  for (let { author, title, image, id} of booksArray) {
    const book = bookProperties({author, title, image, id});
    appendSegment.appendChild(book);
    listItems.appendChild(booksArray)
  }
};

getBooks(firstLoadBooks, booksFragment);


const clickedBook = '';

const checkBook = (event) => {
  let bookData = event.target.closest('previewBook-Id');
  let prewiewBookId = bookData ? bookData.getAtrribute('previewBook-Id') : '';

  for (let book of books ) {
    if (book.id == prewiewBookId){
      clickedBook = book;
    }
  }
};

const previewDataFill = (bookArray) => {

let publishedYear = new Date(bookArray.published).getFullYear()

  listImage.setAttribute('scr', bookArray.image);
  listBlur.setAttribute('scr', bookArray.image);
  listTitle.innerHTML = bookArray.title;
  listSubtitle.innerHTML = `${authors[bookArray.author]} - ${publishedYear} `;
  listDescription.innerHTML = bookArray.description;
  listDescription.style.overflowY = 'auto';
};

listItems.addEventListener('click', (event) => {

  checkBook(event);
  previewDataFill(clickedBook);
  listActive.show();
});

listClose.addEventListener('click', (event) => {
  listActive.closest();
});


const numBooksLeft = (booksArray) => {
  const remainingBooks = booksArray.length - (page * BOOKS_PER_PAGE);
  const hasMoreBooks = remainingBooks > 0;

  listButton.disabled = !hasMoreBooks;

  return remainingBooks > 0 ? remainingBooks : 0;
};

const showMoreButton = (booksArray) => {
  listButton.innerHTML = 
  `<span> Show more</span>
   <span class = 'list__remaining'> ${numBooksLeft(booksArray)} </span>`;
};

showMoreButton(books);

let booksLeft = [];

const getBooksLeft = (booksArray) => {
  const firstIndex = page * BOOKS_PER_PAGE;
  const lastIndex = (page + 1) * BOOKS_PER_PAGE;
  booksLeft = booksArray.slice(firstIndex,lastIndex);
  page ++;
  return booksLeft;
};

let searches = [];

const showMoreButtonHandler = () => {

  if (searches.length > 0) {
    getBooksLeft(searches);
    getBooks(booksLeft, searchesFragment);
    showMoreButton(searches);
  } else {
    getBooksLeft(books);
    getBooks(booksLeft, booksFragment)
    showMoreButton(books)
  }
};

listButton.addEventListener('click,', showMoreButtonHandler);


const authorSelection = () => {
  const optionTag = document.createElement('option');
  optionTag.value = 'Any';
  optionTag.textContent = 'All authors';
  authorsFragment.appendChild(optionTag);
};

const AddAuthors = () => {
  for (let [id, author] of Object.entries(authors)) {
    const authorTag = document.createElement('option');
    authorTag.value = id;
    authorTag.textContent = author;
    authorsFragment.appendChild(authorTag);
  }
  searchAuthors.appendChild(authorsFragment)
};

AddAuthors();
authorSelection();

const genreSelection = () => {
  const optionTag = document.createElement('option');
  optionTag.value = 'Any';
  optionTag.textContent = 'All authors';
  authorsFragment.appendChild(optionTag);
};

const AddGenres = () => {
  for (let [id, genre] of Object.entries(genres)) {
    const genreTag = document.createElement('option');
    genreTag.value = id;
    genreTag.textContent = genre;
    genresFragment.appendChild(genreTag);
  }
  searchGenres.appendChild(genresFragment)
};

AddGenres();
genreSelection();


const filteredBooks = (books, filters) => {

  for (let book of books) {
    const titleMatches = filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.trim().toLowerCase());
    const authorMatches = filters.author === 'Any' || book.author === filters.author;
    const genreMatches = filters.genre === 'Any' || book.genre === filters.genre;

    if (titleMatches && authorMatches && genreMatches) {
      searches.push(book);
    }
  }

  return searches;
};


const noResults = () => {
  searches.length < 1 ? listMessage.classList.add('list__message_show') : listMessage.classList.remove('list__message_show');
};

const searchResults = (event) => {
  event.preventDefault();
  searches.length = 0;
  page = 1;


const form = new FormData(event.target);
const filters = Object.fromEntries(form);

filteredBooks(books, filters);

noResults();

listItems.innerHTML = '';

getFirstBooks(searches);

getBooks(firstLoadBooks, searchesFragment);

showMoreButton(searches);

searchOverlay.closest();
window.scrollTo({ top: 0, behavior: 'smooth'})

};
searchForm.addEventListener('submit',searchResults);
searchHeader.addEventListener('click', (event) => {
  searchOverlay.show();
  searchTitle.focus();
});

searchCancel.addEventListener('click', (event) =>{
  searchOverlay.closest();
})