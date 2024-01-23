const API = 'https://www.googleapis.com/books/v1/volumes?q=';

const controller = (action) => {
  return fetch(`${API}${action}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error('Error fetching data:', error.message);
    });
}

const form = document.querySelector('.form');
const cardWrapper = document.querySelector('.card-wrapper');
let renderedBookIds = new Set();


form.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchField = document.querySelector('#searchText');
  const searchValue = searchField.value.toLowerCase();
})

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchField = document.querySelector('#searchText');
  const searchValue = searchField.value.toLowerCase();

  controller(searchValue)
    .then((data) => data.items || [])
    .then((books) => {
      books.forEach((book) => {
        const bookId = book.id;
        if (!renderedBookIds.has(bookId)) {
          const bookCard = renderBookCard(book);
          cardWrapper.insertBefore(bookCard, cardWrapper.firstChild);
          renderedBookIds.add(bookId);
        }
      });
    })
    .catch((error) => {
      console.error('Error rendering books:', error.message);
    });
});


function renderBookCard(book) {
  const title = book.volumeInfo?.title;
  const authors = book.volumeInfo?.authors;
  const imageLinks = book.volumeInfo?.imageLinks;

  const card = document.createElement("div");
  card.classList.add("book-card");

  const titleElement = document.createElement("h3");
  titleElement.textContent = title;
  titleElement.classList.add('book-name');

  const authorElement = document.createElement("p");
  authorElement.textContent = authors ? authors.join(", ") : "Unknown Author";

  const previewLink = document.createElement("a");
  previewLink.href = book.volumeInfo?.previewLink; 
  previewLink.target = "_blank";

  const imageElement = document.createElement("img");
  imageElement.src = imageLinks ? imageLinks.thumbnail : "no-image.png";
  imageElement.alt = title;
   
  imageElement.classList.add('book-img');
  previewLink.appendChild(imageElement);

  card.append(titleElement, authorElement, previewLink);

  return card;
}
