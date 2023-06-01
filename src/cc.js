const retrieveshows = async() => {
const baseurl = 'https://api.tvmaze.com/';

const request = await fetch('https://api.tvmaze.com/shows');
const responce = await request.json();
return responce;
}

const displayShows = async() => {
    const allShows = await retrieveshows();
    console.log(allShows);

    let end = 6;

const catalogsContainer = document.querySelector('.catalogs');


for (let i = 0; i< 6; i++) {
  const singleShow = allShows[i];

  const catalogItem = document.createElement('div');
  catalogItem.classList.add('showCatalog');

  const image = document.createElement('img');
  image.src = singleShow.image;
  image.alt = 'Movie cover photo';

  const titleContainer = document.createElement('div');
  titleContainer.classList.add('likes-btn');

  const title = document.createElement('h2');
  title.textContent = singleShow.name;

  const likeButton = document.createElement('i');
  likeButton.classList.add('fa-regular', 'fa-heart');

  const like = document.createElement('span');
  like.classList.add('count-like');
  like.textContent = '6';

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
  catalogItem.appendChild(like);
  catalogItem.appendChild(likesText);
  catalogItem.appendChild(commentsButton);
  catalogsContainer.appendChild(catalogItem);
}

const cardCountElement = document.getElementById('cardCount');
const cardCount = allShows.length;
cardCountElement.innerHTML = `(${cardCount})`;

}



displayShows();

