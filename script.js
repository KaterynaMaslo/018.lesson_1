const API = 'https://www.googleapis.com/books/v1/volumes?q=';

const controller = (action) => {
    return fetch(`${API}/${action}`).then((response) => response.json());
}

const form = document.querySelector('.form');
const cardWrapper = document.querySelector('.card-wrapper');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchField = document.querySelector('#searchText');
    const searchValue = searchField.value.toLowerCase();

    controller(searchValue).then((data) => [data])
    .then((books) => {
      books.forEach((book) => {
        const bookCard = renderBookCard(book);
        cardWrapper.appendChild(bookCard);
      });
    });

});

function renderBookCard(book){
    const title = book.items[0]?.volumeInfo?.title;
    const authors = book.items[0]?.volumeInfo?.authors;
    const imageLinks = book.items[0]?.volumeInfo?.imageLinks;

    const card = document.createElement("div");
    card.classList.add("book-card");

    const titleElement = document.createElement("h3");
    titleElement.textContent = title;
    titleElement.classList.add('book-name');

    const authorElement = document.createElement("p");
    authorElement.textContent = authors ? authors.join(", ") : "Unknown Author";

    const imageElement = document.createElement("img");
    imageElement.src = imageLinks ? imageLinks.thumbnail : "no-image.png";
    imageElement.alt = title;
    imageElement.classList.add('book-img');
 
    card.append(titleElement, authorElement, imageElement);

    return card;

}