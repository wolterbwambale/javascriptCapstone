const retrieveshows = async () => {
  const baseurl = 'https://api.tvmaze.com/';
  

  const request = await fetch('https://api.tvmaze.com/shows');
  const response = await request.json();
  return response;
}

const updateLikeCount = async () => {
  const ID="DZEORHzdaLtlaHc946Hd";
  const baseUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/';
  const url = `${baseUrl}apps/${ID}/likes`;
  console.log(url)

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'Access-Control-Allow-Origin': 'http://localhost:9000',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
    body: JSON.stringify({"item_id": 1 })
  };

  const response = await fetch(url, requestOptions);
  const rq = await response.text();
  console.log(rq);
  return response;
}

updateLikeCount();

const displayShows = async () => {
  const allShows = await retrieveshows();
  console.log(allShows);

  const catalogsContainer = document.querySelector('.catalogs');
  catalogsContainer.innerHTML = '';

  let end = 6;
  for (let i = 0; i < 6; i++) {
    const singleShow = allShows[i];

    const catalogItem = document.createElement('div');
    catalogItem.classList.add('showCatalog');

    const image = document.createElement('img');
    image.src = singleShow.image.medium;
    image.alt = 'Movie cover photo';

    const titleContainer = document.createElement('div');
    titleContainer.classList.add('likes-btn');

    const title = document.createElement('h2');
    title.textContent = singleShow.name;

    const likeButton = document.createElement('i');
    likeButton.classList.add('fa-regular', 'fa-heart');

    const like = document.createElement('span');
    like.classList.add('count-like');
    like.textContent = singleShow.likeCount || 0; // Use the likeCount from the API response or set to 0

    const likesText = document.createElement('p');
    likesText.classList.add('like1');
    likesText.textContent = 'likes';

    const commentsButton = document.createElement('button');
    commentsButton.type = 'submit';
    commentsButton.classList.add('commentsBtn');
    commentsButton.textContent = 'Comments';

    // Add a click event listener to the likeButton
    likeButton.addEventListener('click', async () => {
      let updatedCount = parseInt(like.textContent);
      updatedCount++; // Increment the count

      like.textContent = updatedCount.toString();

      await updateLikeCount(singleShow.id, updatedCount);
    });

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

