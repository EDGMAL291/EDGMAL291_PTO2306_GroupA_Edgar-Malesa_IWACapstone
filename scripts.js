//importing data from data.js file.

import { BOOKS_PER_PAGE, books, authors, genres } from "./data.js";

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
const listDubtitle = document.querySelector("[data-list-subtitle]");
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

const bookProperties = ({authors, genres, title, id, image }) => {
    const bookPreviewButton = document.createElement('button');
    bookPreviewButton.classList.add('preview');
    bookPreviewButton.setAttribute('book')
}
