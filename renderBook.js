const fs = require("fs");
const fetch = require("node-fetch");

export const renderBooks = () => {
  const bookshelf = document.getElementById("bookshelfbooks");
  getBooks()
    .then(data => {
      // const books = data.bookShelf.reduce((acc, book) => acc + bookTemplate(book), '');
      // console.log(books)
      // const list = books;
      // bookshelf.innerHTML = list;
      const books = data.bookShelf.map((book) => bookTemplate(book));
      bookshelf.innerHTML = books.join(' ');
      textOverImage();
    })
    .catch(err => { console.log(err); });
}

const getBooks = () => {
 return fetch("/books.json")
    .then(resp => resp.json()
    );
}

const fillStars = (starCount) => {
  let starIcon = '';
  const numberStar = Math.floor(starCount);
  if (!starCount) {
    for (let i = 0; i < 5; i = i + 1) {
      starIcon += '<i class="far fa-star"></i>';
    }
  } else {
    for (let i = 0; i < numberStar; i = i + 1) {
      if (i !== 0) {
        starIcon += '<i class="fa fa-star"></i>';
      } else {
        starIcon = '<i class="fa fa-star"></i>';
      }
    }
    if (numberStar !== 5) {
      for (let i = 0; i < 5 - numberStar; i = i + 1) {
        starIcon += '<i class="far fa-star"></i>';
      }
    }
  }
  return starIcon;
}

const textOverImage = () => {
  var textOverImages = document.getElementsByClassName("onClickTextOverImage");
  var previousTextOverImage;
  for (var i = 0; i < textOverImages.length; i++) {
    textOverImages[i].onclick = function() {
      var classes = this.classList;
      if (classes.contains("show")) {
        classes.remove("show");
      } else {
        if (previousTextOverImage != null)
          previousTextOverImage.classList.remove("show");
        previousTextOverImage = this;
        classes.add("show");
      }
    };
  }
}

const bookTemplate = (bookInfo) => {
  const {
    title,
    publishedDate,
    authors,
    pageCount,
    description,
    averageRating,
    thumbnail,
    isbn
  } = bookInfo;

  return `
   <div class="column">
    <div class="cover">
      <div class="onClickTextOverImage" style="background-image:url(${thumbnail});">
        <div class="info-over-cover">
          <img src="img/rate-book/heart.png" class="icon-up-left" />
          <img src="img/rate-book/opened-book.png" class="icon-center" />
          <img src="img/rate-book/bookmark.png" class="icon-up-right" />
          <p class="rating-book">rate this book</p>
          <div class="star-rating-book rate">
             ${fillStars(averageRating)}
          </div>
        </div>
        <i class="fas fa-caret-left arrow"></i>
        <div id="bookModalInfo" class="bookModalInfo">
          <div id="modalHeader"> 
            <div id="titleAndYear">  
                <p class="titleModal" style="margin:1% 0;">${title}</p>
                <p class="yearModal">${publishedDate}</p>
            </div>    
            <p class="authorModal" style="margin:1% 0;">
                Novel by<span id="color-word">${authors}</span>
            </p>
            <p class="pageCount">${pageCount} pages</p>
        </div>   
          <p id="summaryTitle">SUMMARY</p>
          <article id="summary" style="margin:5% 0;">
            ${description}
          </article>
          <p id="ratingTitle" style="margin:1% 0;">RATING</p>
          <div id="average-rating" style="display: none">${fillStars(averageRating)}</div>
          <div class="star-rating rate">
              ${fillStars(averageRating)}
          </div>
          <p style="margin:6% 0;"></p>
          <p class="recommend" style="margin:1% 0;">RECOMMENDED BY</p>
          <div class="recommended">
            <img src="img/recommended/user1.png" />
            <img src="img/recommended/user2.png" />
            <img src="img/recommended/user3.png" />
          </div>
        </div>
      </div>
      <div class="cover-info">
        <p class="book-title">${title}</p>
        <p class="book-author">${authors}</p>
        <div class="star-rating rate">
          ${fillStars(averageRating)}
        </div>
      </div>
    </div>
  </div>
  `;
}

export const stopPropagation = (event) => {
  event.stopPropagation();
}
