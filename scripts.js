let matches = bookData;
let page = 1;

if (!bookData && !Array.isArray(bookData)) throw new Error('Source required') 
if (!range || range.length < 2) throw new Error('Range must be an array with two numbers')

day = {
    dark: '10, 10, 20',
    light: '255, 255, 255',
}

night = {
    dark: '255, 255, 255',
    light: '10, 10, 20',
}

const booksFragment = document.createDocumentFragment()
const extractedBooks = bookData.slice(0, 36)

for (const { author, image, title, id } of extractedBooks) {
    const preview = createPreview({
        author,
        id,
        image,
        title
    })

    booksFragment.append(preview)
}

data-list-items.append(booksFragment)

//------Genres------//

const bookGenres = document.createDocumentFragment()
const genreElement = document.createElement('option')
genreElement.value = 'any'
genreElement.innerText = 'All Genres'
bookGenres.append(genreElement)

for (const [id, genreName] of Object.entries(genreData)) {
    const genreSelection =  document.createElement('option')
    genreSelection.value = id;
    genreSelection.innerText = genreName;
    bookGenres.append(genreSelection);
}

data-search-genres.append(bookGenres)

//------Genres------//



//------Authors------//
const bookAuthors = document.createDocumentFragment()
const authorsElement = document.createElement('option')
authorsElement.value = 'any'
authorsElement.innerText = 'All Authors'
bookAuthors.append(authorsElement)

for (const [id, authorsName] of Object.entries(authorData)) {
    const authorSelection = document.createElement('option')
    authorSelection.value = id;
    authorSelection.innerText = authorsName;
    bookAuthors.append(authorSelection)
}
data-search-authors.append(bookAuthors)
//------Authors------//

//-------Theme---------//

document.addEventListener('DOMContentLoaded', () => {
    const themeSelector = document.querySelector('[data-settings-theme]');

    const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day';

    if (themeSelector) {
        themeSelector.value = preferredTheme;
    }

    themeSelector.addEventListener('change', (event) => {
        const selectedTheme = event.target.value;
        applyTheme(selectedTheme);
    });
});

function applyTheme(theme) {
    if (theme === 'night') {
        // Apply dark theme
        document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
        document.documentElement.style.setProperty('--color-light', '10, 10, 20');
    } else {
        // Apply light theme
        document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
        document.documentElement.style.setProperty('--color-light', '255, 255, 255');
    }
}

//-------Theme---------//

//-------Show more button-----//
const showMoreButton = document.getElementById('data-list-button');
const listContainer = document.querySelector('[data-list-items]');

if (showMoreButton && listContainer) {
    showMoreButton.addEventListener('click', () => {
        listContainer.append(createPreview(matches, page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE));

        const remaining = Math.max(matches.length - (page + 1) * BOOKS_PER_PAGE, 0);
        showMoreButton.innerHTML = `<span>Show more</span><span class="list__remaining"> (${remaining})</span>`;
        showMoreButton.disabled = remaining <= 0;

        page += 1;
    });
}

//-------Show more button-----//


//-----------Search--------//

const searchCancel = document.querySelector('[data-search-cancel]');
const searchOverlay = document.querySelector('[data-search-overlay]');
const searching = document.querySelector('[data-header-search]')
const Input = document.querySelector('[data-search-title]')

if (searchCancel) {
    searchCancel.addEventListener('click', () => {
        searchOverlay.open = false; 
    });
}
if (searching) {
    searching.addEventListener('click', () =>  {
        searchOverlay.open = true;
        Input.focus();
    });
};
//-----------Search--------//

//---------Settings-------//
const settingsCancel = document.querySelector('[data-settings-cancel]');
const settingsOverlay = document.querySelector('[data-settings-overlay]');
const settingsButton = document.querySelector('[data-header-settings]');


if (settingsCancel) {
    settingsCancel.addEventListener('click', () => {
        searchOverlay.open = false;
    });
}


if (settingsButton) {
    settingsButton.addEventListener('click', () => {
        settingsOverlay.open = true;
    });
}
//---------Settings-------//



// .submit() { actions.settings.submit }
// data-list-close.click() { data-list-active.open === false }

const searchForm = document.querySelector('[data-search-form]');

searchForm.addEventListener('submit', (occasion) => {
    occasion.preventDefault();
    const formData = new FormData(occasion.target);
    const filters = Object.fromEntries(formData.entries());
    const result = bookData.filter(book => {
        const titleMatch = !filters.title.trim() || book.title.toLowerCase().includes(filters.title.trim().toLowerCase());
        const authorMatch = filters.author === 'any' || book.author === filters.author;
        const genreMatch = filters.genre === 'any' || book.genres.includes(filters.genre);
        return titleMatch && authorMatch && genreMatch;
    });

    result;
});

    
    

    for (book; booksList; i++) {
        titleMatch = filters.title.trim() = '' && book.title.toLowerCase().includes[filters.title.toLowerCase()]
        authorMatch = filters.author = 'any' || book.author === filters.author

        {
            genreMatch = filters.genre = 'any'
            for (genre; book.genres; i++) { if singleGenre = filters.genre { genreMatch === true }}}
        }

        if titleMatch && authorMatch && genreMatch => result.push(book)
    }

    if display.length < 1 
    data-list-message.class.add('list__message_show')
    else data-list-message.class.remove('list__message_show')
    

    data-list-items.innerHTML = ''
    const fragment = document.createDocumentFragment()
    const extracted = source.slice(range[0], range[1])

    for ({ author, image, title, id }; i < extracted; i++) {
        const { author: authorId, id, image, title } = props

        element = document.createElement('button')
        element.classList = 'preview'
        element.setAttribute('data-preview', id)

        element.innerHTML = /* html */ `
            <img
                class="preview__image"
                src="${image}"
            />
            
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[authorId]}</div>
            </div>
        `

        fragment.appendChild(element)
    }
    
    data-list-items.appendChild(fragments)
    initial === matches.length - [page * BOOKS_PER_PAGE]
    remaining === hasRemaining ? initial : 0
    data-list-button.disabled = initial > 0

    data-list-button.innerHTML = /* html */ `
        <span>Show more</span>
        <span class="list__remaining"> (${remaining})</span>
    `

    window.scrollTo({ top: 0, behavior: 'smooth' });
    data-search-overlay.open = false
}

data-settings-overlay.submit; {
    preventDefault()
    const formData = new FormData(event.target)
    const result = Object.fromEntries(formData)
    document.documentElement.style.setProperty('--color-dark', css[result.theme].dark);
    document.documentElement.style.setProperty('--color-light', css[result.theme].light);
    data-settings-overlay).open === false
}

data-list-items.click() {
    pathArray = Array.from(event.path || event.composedPath())
    active;

    for (node; pathArray; i++) {
        if active break;
        const previewId = node?.dataset?.preview
    
        for (const singleBook of books) {
            if (singleBook.id === id) active = singleBook
        } 
    }
    
    if !active return
    data-list-active.open === true
    data-list-blur + data-list-image === active.image
    data-list-title === active.title
    
    data-list-subtitle === '${authors[active.author]} (${Date(active.published).year})'
    data-list-description === active.description
}
