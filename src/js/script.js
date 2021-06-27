
const select = {
  templateOf: {
    book: '#template-book',
  },

  containerOf: {
    book: '.books-list',
    rate: '.book_rating_fill',
    form: '.filters form'
  }
};

const templates = {
  singleBook: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
};

class BooksList {
  constructor() {
    const thisBookList = this;

    thisBookList.filters = [];
    thisBookList.favoriteBooks = [];

    thisBookList.dom = {};

    thisBookList.initData();
    thisBookList.getElements();
    thisBookList.determineRatingBgc();
    thisBookList.initActions();
    thisBookList.filterBooks();
  }

  initData() {
    const thisBookList = this;

    thisBookList.data = dataSource.books;
  }

  getElements() {
    const thisBookList = this;
    // console.log(thisBookList);
    thisBookList.dom.bookListContainer = document.querySelector(select.containerOf.book);
    thisBookList.dom.filterForm = document.querySelector(select.containerOf.form);


  }

  initActions() {
    const thisBookList = this;
    thisBookList.dom.bookListContainer.addEventListener('dblclick', function(event){
      event.preventDefault();
      const bookId = event.target.offsetParent.getAttribute('data-id');
      // console.log(bookId);
      if(event.target.offsetParent.classList.contains('book__image')){
        if(thisBookList.favoriteBooks.includes(bookId)){
          const indexOfBook = thisBookList.favoriteBooks.indexOf(bookId);

          event.target.offsetParent.classList.remove('favorite');
          thisBookList.favoriteBooks.splice(indexOfBook,1);
          // console.log(favoriteBooks);

        } else{
          event.target.offsetParent.classList.add('favorite');
          thisBookList.favoriteBooks.push(bookId);
          // console.log(favoriteBooks);
        }
      }
    });

    thisBookList.dom.filterForm.addEventListener('click', function(event){
      if(event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter'){
        if(event.target.checked){
          thisBookList.filters.push(event.target.value);
          // console.log(thisBookList.filters);
          thisBookList.filterBooks();
        } else {
          const indexOfValue = thisBookList.filters.indexOf(event.target.value);
          thisBookList.filters.splice(indexOfValue, 1);
          // console.log(thisBookList.filters);
          thisBookList.filterBooks();
        }

      }
    });
  }

  filterBooks() {
    const thisBookList = this;
    for(const book in thisBookList.data) {

      let shouldBeHidden = false;
      for(const filter of thisBookList.filters){
        // console.log(filter);
        if(thisBookList.data[book].details[filter]){
          shouldBeHidden = true;
          break;
        }
      }
      const bookId = thisBookList.data[book].id;
      const thisBook = thisBookList.dom.bookListContainer.querySelector('.book__image[data-id="' + bookId + '"]');

      if(shouldBeHidden){
        thisBook.classList.add('hidden');
      } else {
        thisBook.classList.remove('hidden');
      }
    }
  }

  determineRatingBgc() {
    const thisBookList = this;
    for(const book in thisBookList.data){
      const ratingValue = thisBookList.data[book].rating;
      // console.log(ratingValue);
      const percentRating = ratingValue * 10;
      // console.log(percentRating);
      const generatedHTML = templates.singleBook(thisBookList.data[book]);
      // console.log(generatedHTML);

      const element = utils.createDOMFromHTML(generatedHTML);
      // console.log(element);
      const ratingBar = element.querySelector('.book__rating__fill');
      // console.log(ratingBar);


      if(ratingValue < 6) {
        ratingBar.style.background = 'linear-gradient(to right, orange '+ percentRating +'%, transparent ' + percentRating + '%)';
      } else if(ratingValue > 6 && ratingValue <= 8){
        ratingBar.style.background = 'linear-gradient(to right, greenyellow '+ percentRating +'%, transparent ' + percentRating + '%)';
      } else if(ratingValue > 8 && ratingValue <= 9) {
        ratingBar.style.background = 'linear-gradient(to right, green '+ percentRating +'%, transparent ' + percentRating + '%)';
      } else {
        ratingBar.style.background = 'linear-gradient(to right, red '+ percentRating +'%, transparent ' + percentRating + '%)';
      }


      thisBookList.dom.bookListContainer.appendChild(element);
    }
  }

}

const app = new BooksList();

console.log(app);


