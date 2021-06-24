
const select = {
  templateOf: {
    book: '#template-book',
  },

  containerOf: {
    book: '.books-list',
  }
};

const templates = {
  singleBook: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
};

const bookContainer = document.querySelector(select.containerOf.book);
const filterForm = document.querySelector('.filters form');
const favoriteBooks = [];
const filters = [];

function renderBook(bookData){
  const generatedHTML = templates.singleBook(bookData);
  // console.log(generatedHTML);

  const element = utils.createDOMFromHTML(generatedHTML);
  // console.log(element);

  // console.log(bookContainer);

  bookContainer.appendChild(element);

}


function initActions(){

  bookContainer.addEventListener('dblclick', function(event){
    event.preventDefault();
    const bookId = event.target.offsetParent.getAttribute('data-id');
    // console.log(bookId);
    if(event.target.offsetParent.classList.contains('book__image')){
      if(favoriteBooks.includes(bookId)){
        const indexOfBook = favoriteBooks.indexOf(bookId);

        event.target.offsetParent.classList.remove('favorite');
        favoriteBooks.splice(indexOfBook,1);
        // console.log(favoriteBooks);

      } else{
        event.target.offsetParent.classList.add('favorite');
        favoriteBooks.push(bookId);
        // console.log(favoriteBooks);
      }
    }
  });

  filterForm.addEventListener('click', function(event){
    if(event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter'){
      if(event.target.checked){
        filters.push(event.target.value);
        filterBooks();
      } else {
        const indexOfValue = filters.indexOf(event.target.value);
        filters.splice(indexOfValue, 1);
        filterBooks();
      }

    }
  });
}


function filterBooks(){
  for(const book in dataSource.books) {
    let shouldBeHidden = false;
    for(const filter of filters){
      if(dataSource.books[book].details[filter]){
        shouldBeHidden = true;
        break;
      }
    }
    const bookId = dataSource.books[book].id;
    const thisBook = bookContainer.querySelector('.book__image[data-id="' + bookId + '"]');

    if(shouldBeHidden){
      thisBook.classList.add('hidden');
    } else {
      thisBook.classList.remove('hidden');
    }
  }
}


for(const book in dataSource.books){
  renderBook(dataSource.books[book]);
}

initActions();






