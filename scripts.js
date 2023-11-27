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
    const bookPreviewData = document.createElement('button');
    bookPreviewData.classList = 'preview';
    bookPreviewData.setAttribute('book-Id', id);
    bookPreviewData.innerHTML = 
        `<img class='preview__image' src='${image}'/>

        <div class='preview__info'>
          <h3 class='preview__title'>${title}</h3>
          <div class="preview__author">${authors[author]}</div>
        </div>`;
  return bookPreviewData;
};

const getBooks = (booksArray, fragment) => {

  for (let { author, title, image, id} of booksArray) {
    const book = bookProperties({author, title, image, id,});
    fragment.appendChild(book);
    listItems.appendChild(fragment);
  }
};

getBooks(firstLoadBooks, booksFragment);


let clickedBook = '';

const checkBook = (event) => {
  let element = event.target.closest('book-id');
  let prewiewBookId = element ? element.getAttribute('book-id') : '';

  for (let book of books ) {
    if (book.id == prewiewBookId){
      clickedBook = book;
    }
  }
};

const previewDataFill = (clickedBook) => {

let publishedYear = new Date(clickedBook.published).getFullYear()

  listImage.setAttribute('scr', clickedBook.image);
  listBlur.setAttribute('scr', clickedBook.image);
  listTitle.innerHTML = clickedBook.title;
  listSubtitle.innerHTML = `${authors[clickedBook.author]} - ${publishedYear} `;
  listDescription.innerHTML = clickedBook.description;
  listDescription.style.overflowY = 'auto';
};

listItems.addEventListener('click', (event) => {

  checkBook(event);
  previewDataFill(clickedBook);
  listActive.show();
});

listClose.addEventListener('click', (event) => {
  listActive.close();
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
  const allAuthors = document.createElement('option');
  allAuthors.value = 'any';
  allAuthors.textContent = 'All authors';
  authorsFragment.appendChild(allAuthors);
};

const AddAuthors = () => {
  for (let [id, author] of Object.entries(authors)) {
    const authorsList = document.createElement('option');
    authorsList.value = id;
    authorsList.innerHTML = author;
    authorsFragment.appendChild(authorsList);
  }
  searchAuthors.appendChild(authorsFragment);
};
authorSelection();
AddAuthors();


const genreSelection = () => {
  const allGenres = document.createElement('option');
  allGenres.value = 'any';
  allGenres.textContent = 'All Genres';
  genresFragment.appendChild(allGenres);
};

const AddGenres = () => {
  for (let [id, genre] of Object.entries(genres)) {
    const genresList = document.createElement('option');
    genresList.value = id;
    genresList.innerHTML = genre;
    genresFragment.appendChild(genresList);
  }
  searchGenres.appendChild(genresFragment);
};
genreSelection();
AddGenres();



const filteredBooks = (books, filters) => {

  for (let book of books) {
    let titleMatches = filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase());
    let authorMatches = filters.author === 'Any' || book.author === filters.author;
    let genreMatches = filters.genre === 'Any' ;

    for (let genre of book.genres){
      if (genre === filters.genre){
        genreMatches = true;
      }
    };

    if (titleMatches && authorMatches && genreMatches) {
      searches.push(book);
    }
  };
};


const noResults = () => {
  searches.length < 1 ? listMessage.classList.add('list__message_show') : listMessage.classList.remove('list__message_show');
};

const searchResults = (event) => {
  event.preventDefault();
  page = 1;
  searches.length = 0;
  


const form = new FormData(event.target);
const filters = Object.fromEntries(form);

filteredBooks(books, filters);

noResults();

listItems.innerHTML = '';

getFirstBooks(searches);

getBooks(firstLoadBooks, searchesFragment);

showMoreButton(searches);

searchOverlay.close();
window.scrollTo({ top: 0, behavior: 'smooth'});

};
searchForm.addEventListener('submit', searchResults);
searchHeader.addEventListener('click', (event) => {
  searchOverlay.show();
  searchTitle.focus();
});

searchCancel.addEventListener('click', (event) =>{
  searchOverlay.close();
});
const day = {
  dark :'10, 10, 20',
  light : '255, 255, 255'
};

const night = {
  dark : '255, 255, 255',
  light : '10, 10, 20',
};

const nightTheme = () => {
  document.documentElement.style.setProperty("--color-dark", night.dark);
  document.documentElement.style.setProperty("--color-light", night.light);
};
const dayTheme = () => {
  document.documentElement.style.setProperty("--color-dark", day.dark);
  document.documentElement.style.setProperty("--color-light", day.light);
};

const applyPreferredTheme = () => {

  const isNightThemePreferred = settingstheme.value === "night";
  const isBrowserDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (isNightThemePreferred && isBrowserDarkMode) {
    nightTheme();
  } else {
    dayTheme();
  }
};

applyPreferredTheme();

const themeSelectionHandler = (event) => {
  event.preventDefault();

  const theme = settingstheme.value;
  if (theme === 'day') {
    dayTheme();
  } else if (theme === 'night') {
    nightTheme();  
  }
      settingsoverlay.close();
};
settingsform.addEventListener('submit', themeSelectionHandler);

settingsHeader.addEventListener('click', (event) => {

  settingsoverlay.show();
});

settingscancel.addEventListener('click', (event) => {
  settingsoverlay.close();
});


