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
const favoriteBooks = [];

function renderBook(bookData){
  const generatedHTML = templates.singleBook(bookData);
  // console.log(generatedHTML);

  const element = utils.createDOMFromHTML(generatedHTML);
  // console.log(element);

  // console.log(bookContainer);

  bookContainer.appendChild(element);

}


function initActions(){
  const booksList = bookContainer.querySelectorAll('.book__image');

  for(const book of booksList) {
    book.addEventListener('dblclick', function(event){
      event.preventDefault();

      const bookId = book.getAttribute('data-id');
      if(!(favoriteBooks.includes(bookId))){
        book.classList.add('favorite');
        favoriteBooks.push(bookId);
        console.log(favoriteBooks);
      } else {
        book.classList.remove('favorite');
        const indexOfBook = favoriteBooks.indexOf(bookId);
        favoriteBooks.splice(indexOfBook,1);
        console.log(favoriteBooks);
      }
    });
  }
}

for(const book in dataSource.books){
  renderBook(dataSource.books[book]);
}

initActions();





