// Constants for DOM elements and book data
const DOMElements = {
    bookList: document.querySelector("[data-list-items]"),
    showMoreButton: document.querySelector("[data-list-button]"),
    noResultsMessage: document.querySelector("[data-list-message]"),
    bookPreviewOverlay: document.querySelector("[data-list-active]"),
    closePreviewButton: document.querySelector("[data-list-close]"),
    
  };
  
  const BOOKS_PER_PAGE = 36;
  let currentPage = 1;
  let searchResults = [];
  
  // Functions for UI Updates
  function renderBookList(books, container) {
    container.innerHTML = '';
    books.forEach(book => {
      container.appendChild(createBookButton(book));
    });
  }
  
  function createBookButton({ id, image, title, author }) {
    const button = document.createElement("button");
    button.classList.add("preview");
    button.setAttribute("data-book-id", id);
    button.innerHTML = `
      <img src="${image}" class="preview__image"/>
      <div class="preview__info">
        <h3 class="preview__title">${title}</h3>
        <div class="preview__author">${author}</div>
      </div>`;
    return button;
  }
  
  function updateShowMoreButton() {
    const remainingBooks = books.length - currentPage * BOOKS_PER_PAGE;
    DOMElements.showMoreButton.textContent = `Show more (${remainingBooks})`;
    DOMElements.showMoreButton.disabled = remainingBooks <= 0;
  }
  
  // Event Handlers
  DOMElements.bookList.addEventListener("click", (event) => {
    const bookId = event.target.closest("[data-book-id]").getAttribute("data-book-id");
    const selectedBook = books.find(book => book.id === bookId);
    if (selectedBook) {
      showBookPreview(selectedBook);
    }
  });
  
  function showBookPreview(book) {
    // Update and show book preview overlay with book details
  }
  
  // Initialize
  function initializeBookList() {
    const initialBooks = books.slice(0, BOOKS_PER_PAGE);
    renderBookList(initialBooks, DOMElements.bookList);
    updateShowMoreButton();
  }
  
  initializeBookList();
  
  // Additional code for search functionality, theme switching, etc.
  