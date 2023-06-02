const retrieveshows = async () => {
  const baseurl = 'https://api.tvmaze.com/';

  const request = await fetch('https://api.tvmaze.com/shows');
  const response = await request.json();
  return response;
}

const updateLikeCount = async (itemId, updatedCount) => {
  const ID = "DZEORHzdaLtlaHc946Hd";
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
    body: JSON.stringify({ "item_id": itemId })
  };

  const response = await fetch(url, requestOptions);
  const rq = await response.text();
  console.log(rq);
  return response;
}

const saveLikeCount = (itemId, count) => {
  localStorage.setItem(itemId, count.toString());
}

const getLikeCount = async (itemId) => {
  const ID = "DZEORHzdaLtlaHc946Hd";
  const baseUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/';
  const url = `${baseUrl}apps/${ID}/likes`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const likeData = data.filter((item) => item.item_id === itemId);
    if (likeData.length > 0) {
      return likeData[0].likes;
    } else {
      return 0;
    }
  } catch (error) {
    console.error(error);
    return 0;
  }
}

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
    const itemId = singleShow.id;
    const initialCount = await getLikeCount(itemId);
    like.textContent = initialCount || 0; // Use the fetched count or set to 0

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
      saveLikeCount(itemId, updatedCount);

      await updateLikeCount(itemId, updatedCount);
    });

    commentsButton.addEventListener('click', () => {
      openPopup(i); // Open the corresponding popup when the button is clicked
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


const movieDisplay = [
  {
    image: 'https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg',
    title: 'The Blacklist',
    language: 'English',
    duration: '2hrs',
    genres: 'Drama',
    rating: '5.5',
    summary: 'The Blacklist is a crime drama involving a former government agent who turned into a high-profile criminal turning himself in to the FBI offering to help catch criminals.'
  }
];

const container = document.getElementById('work');

movieDisplay.forEach((item, index) => {
  const movieDiv = document.createElement('div');
  movieDiv.id = `movie-display-${index}`;
  movieDiv.className = 'popup';
  movieDiv.innerHTML = `
    <div class="popup-content">
      <span id="closePopupButton-${index}" class="close-popup-button"><i class="fa-solid fa-xmark"></i></span>
      <div class="photo1">
        <img class="movie-pic" src="${item.image}" alt="movie photo">
      </div>
      <h2>${item.title}</h2>
      <div class="details">
        <div class="df1">
          <h2>Language: ${item.language}</h2>
          <h2>Estimated time: ${item.duration}</h2>
        </div>
        <div class="df2">
          <h2>Movie genres: ${item.genres}</h2>
          <h2>Rating: ${item.rating}</h2>
        </div>
      </div>
      <h2 class=comment-count>comments(3)</h2>
      <span>12/12/2012:alex i like the product</span><br>
      <span>12/12/2012:alex i like the product</span>
      <h2>Summary:</h2>
      <p class="summary">
        ${item.summary}
      </p>
      <div class="whole-comment">
        <h3>Add your comments</h3>
      </div>
      <form id="popupForm-${index}" class="form">
        <div class="flex-form">
          <input type="text" name="name" placeholder="Your Name" class="name" id="name-${index}"> <br>
          <textarea
            name="text-message"
            class="type-text message"
            cols="30"
            rows="10"
            placeholder="Your insight"
            id="message-${index}"
            maxlength="500"
            required
          ></textarea>
        </div>
        <button id="comment" type="submit">Comment</button>
      </form>
    </div>
  `;

  container.appendChild(movieDiv);
});

const openPopup = (index) => {
  const popup = document.getElementById(`movie-display-${index}`);
  popup.style.display = 'block';
}

const closePopup = (index) => {
  const popup = document.getElementById(`movie-display-${index}`);
  popup.style.display = 'none';
}

movieDisplay.forEach((item, index) => {
  const closeButton = document.getElementById(`closePopupButton-${index}`);
  closeButton.addEventListener('click', function() {
    closePopup(index);
  });
});


// Call the displayShows function

