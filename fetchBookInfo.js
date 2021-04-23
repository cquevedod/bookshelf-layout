const fs = require("fs");
const fetch = require("node-fetch");

const concatenate = (url, ...themes) => {
  return themes.map(theme => `${url}${theme}&maxResults=30`);
}

const bookObject = (book) => {
  return {
    title: book.volumeInfo.title,
    publishedDate: book.volumeInfo.publishedDate.substr(0, 4),
    authors: book.volumeInfo.authors,
    pageCount: book.volumeInfo.pageCount,
    description: book.volumeInfo.description,
    averageRating: book.volumeInfo.averageRating,
    thumbnail: book.volumeInfo.imageLinks.thumbnail,
    isbn: book.volumeInfo.industryIdentifiers
  }
}

(() => {
  const apiurl = "https://www.googleapis.com/books/v1/volumes?q=subject:";
  const topics = ["FICTION", "THRILLER"];
  const urls = concatenate(apiurl, ...topics);
  const bookSet = {
    bookShelf: []
  };

  for (let url of urls) {
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        bookSet.bookShelf = data.items.map(book => {
          if (!data.items) return;
          return bookObject(book);
        })
        const info = JSON.stringify(bookSet, null, 2);
        fs.writeFileSync("./books.json", info, err => {
          if (err) throw err;
          console.log("Data written into a file");
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
})();


