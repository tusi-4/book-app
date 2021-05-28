{
  'use strict';

  const select = {
    templateOf: {
      bookTemplate: '#template-book',
    },
    containerOf: {
      booksList: '.books-list',
      filters: '.filters',
    },
    booksCovers: {
      image: '.book__image',
    }
  };

  const templates = {
    bookHT: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML),
  };

  class BooksList {
    constructor(){
      const thisBooksList = this;

      thisBooksList.getElements();
      thisBooksList.renderBooks();
      thisBooksList.filterBooks();
      thisBooksList.determineRatingBgc();
      thisBooksList.initActions();

    }

    renderBooks() {
      const thisBooksList = this;

      for(let book in dataSource.books){
        const oneBook = dataSource.books[book];

        const ratingBgc = thisBooksList.determineRatingBgc(oneBook.rating);

        const ratingWidth = oneBook.rating * 10;

        oneBook.ratingBgc = ratingBgc;

        oneBook.ratingWidth = ratingWidth;

        const generatedHTML = templates.bookHT(oneBook);

        const generatedDOM = utils.createDOMFromHTML(generatedHTML);

        thisBooksList.booksList.appendChild(generatedDOM);
      }
    }

    getElements() {
      const thisBooksList = this;

      thisBooksList.booksList = document.querySelector(select.containerOf.booksList);
      thisBooksList.filterBox = document.querySelector(select.containerOf.filters);

      thisBooksList.favoriteBooks = [];
      thisBooksList.filters = [];
    }

    initActions() {
      const thisBooksList = this;

      thisBooksList.covers = thisBooksList.booksList.querySelectorAll(select.booksCovers.image);

      for(let cover of thisBooksList.covers){
        cover.addEventListener('dblclick', function(){
          event.preventDefault();

          if(event.target.offsetParent.classList.contains('book__image')){
            if(cover.classList.contains('favorite')){
              cover.classList.remove('favorite');
              const favBook = thisBooksList.favoriteBooks.indexOf(cover.getAttribute('data-id'));
              thisBooksList.favoriteBooks.splice(favBook, 1);
            } else {
              cover.classList.add('favorite');
              const clickedCover = cover.getAttribute('data-id');
              thisBooksList.favoriteBooks.push(clickedCover);
            }
          }
        });
      }

      thisBooksList.filterBox.addEventListener('click', function(){
        const clickedBox = event.target;

        if(clickedBox.tagName == 'INPUT' && clickedBox.type == 'checkbox' && clickedBox.name == 'filter'){
          if(clickedBox.checked == true){
            thisBooksList.filters.push(clickedBox.value);
          } else {
            const unfiltered = thisBooksList.filters.indexOf(clickedBox.value);
            thisBooksList.filters.splice(unfiltered, 1);
          }
        }

        thisBooksList.filterBooks();
      });
    }

    filterBooks() {
      const thisBooksList = this;

      for(let book of dataSource.books){
        let shouldBeHidden = false;
        // tutaj const byl wziety z podpowiedzi Kodilli
        for(let filter of thisBooksList.filters){
          if(!book.details[filter]){
            shouldBeHidden = true;
            break;
          }
        }

        thisBooksList.bookHidden = document.querySelector('.book__image[data-id="' + book.id + '"]');

        if(shouldBeHidden == true){
          thisBooksList.bookHidden.classList.add('hidden');
        } else {
          thisBooksList.bookHidden.classList.remove('hidden');
        }
      }
    }

    determineRatingBgc(rating) {
      let background = '';
      if(rating < 6){
        background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%);';
      } else if(rating > 6 && rating <= 8){
        background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);';
      } else if(rating > 8 && rating <= 9){
        background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);';
      } else if(rating > 9){
        background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);';
      }
      return background;
    }
  }

  const app = new BooksList();
  app;
}









/* SPOCZKO
  function renderBooks(){
    const thisBook = this;

    thisBook.booksList = document.querySelector(select.containerOf.booksList);

    for(let book in dataSource.books){
      const oneBook = dataSource.books[book];

      const ratingBgc = determineRatingBgc(oneBook.rating);

      const ratingWidth = oneBook.rating * 10;

      oneBook.ratingBgc = ratingBgc;

      oneBook.ratingWidth = ratingWidth;

      const generatedHTML = templates.bookHT(oneBook);

      const generatedDOM = utils.createDOMFromHTML(generatedHTML);

      thisBook.booksList.appendChild(generatedDOM);
    }
  }

  renderBooks();

  const favoriteBooks = [];

  function initActions(){
    const thisBook = this;

    thisBook.covers = thisBook.booksList.querySelectorAll(select.booksCovers.image);
    thisBook.filterBox = document.querySelector(select.containerOf.filters);

    for(let cover of thisBook.covers){
      cover.addEventListener('dblclick', function(){
        event.preventDefault();

        if(event.target.offsetParent.classList.contains('book__image')){
          if(cover.classList.contains('favorite')){
            cover.classList.remove('favorite');
            const favBook = favoriteBooks.indexOf(cover.getAttribute('data-id'));
            favoriteBooks.splice(favBook, 1);
          } else {
            cover.classList.add('favorite');
            const clickedCover = cover.getAttribute('data-id');
            favoriteBooks.push(clickedCover);
          }
        }
      });
    }

    thisBook.filterBox.addEventListener('click', function(){
      const clickedBox = event.target;

      if(clickedBox.tagName == 'INPUT' && clickedBox.type == 'checkbox' && clickedBox.name == 'filter'){
        if(clickedBox.checked == true){
          filters.push(clickedBox.value);
        } else {
          const unfiltered = filters.indexOf(clickedBox.value);
          filters.splice(unfiltered, 1);
        }
      }

      filterBooks();
    });
  }

  const filters = [];

  function filterBooks(){
    for(let book of dataSource.books){
      let shouldBeHidden = false;
      // tutaj const byl wziety z podpowiedzi Kodilli
      for(let filter of filters){
        if(!book.details[filter]){
          shouldBeHidden = true;
          break;
        }
      }

      const bookHidden = document.querySelector('.book__image[data-id="' + book.id + '"]');

      if(shouldBeHidden == true){
        bookHidden.classList.add('hidden');
      } else {
        bookHidden.classList.remove('hidden');
      }
    }
  }



  function determineRatingBgc(rating){
    let background = '';
    if(rating < 6){
      background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%);';
    } else if(rating > 6 && rating <= 8){
      background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);';
    } else if(rating > 8 && rating <= 9){
      background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);';
    } else if(rating > 9){
      background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);';
    }
    return background;
  }

  initActions();
}
*/
