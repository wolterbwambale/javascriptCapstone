import './style.css';
import getMovies from '../modules/getmovies.js';

const catalogsContainer = document.querySelector('.catalogs');

const catalogItems = [
  {
    imageSrc: '/assets/images/blst.png',
    title: 'Movie 1',
  },
  {
    imageSrc: '/assets/images/blst.png',
    title: 'Movie 2',
  },
  {
    imageSrc: '/assets/images/blst.png',
    title: 'Movie 3',
  },
  {
    imageSrc: '/assets/images/blst.png',
    title: 'Movie 4',
  },
  {
    imageSrc: '/assets/images/blst.png',
    title: 'Movie 5',
  },
  {
    imageSrc: '/assets/images/blst.png',
    title: 'Movie 6',
  },
];

catalogItems.forEach((item) => {
  const catalogItem = document.createElement('div');
  catalogItem.classList.add('showCatalog');

  const image = document.createElement('img');
  image.src = item.imageSrc;
  image.alt = 'Movie cover photo';

  const titleContainer = document.createElement('div');
  titleContainer.classList.add('likes-btn');

  const title = document.createElement('h2');
  title.textContent = item.title;

  const likeButton = document.createElement('i');
  likeButton.classList.add('fa-regular', 'fa-heart');

  const likesText = document.createElement('p');
  likesText.classList.add('like1');
  likesText.textContent = 'likes';

  const commentsButton = document.createElement('button');
  commentsButton.type = 'submit';
  commentsButton.classList.add('commentsBtn');
  commentsButton.textContent = 'Comments';

  titleContainer.appendChild(title);
  titleContainer.appendChild(likeButton);

  catalogItem.appendChild(image);
  catalogItem.appendChild(titleContainer);
  catalogItem.appendChild(likesText);
  catalogItem.appendChild(commentsButton);
  catalogsContainer.appendChild(catalogItem);
});
