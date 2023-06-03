/*eslint-disable */

import addComment from "../modules/addComment.js";
import PopupComment from "../modules/PopupComment.js";
import {updateLikeCount,saveLikeCount,getLikeCount} from '../modules/likesCount.js'

const baseurl = "https://api.tvmaze.com/";
const retrieveshows = async () => {

  const request = await fetch("https://api.tvmaze.com/shows");
  const response = await request.json();
  return response;
};



let startIndex = 0; 
const showLimit = 6; 
const displayShows = async () => {
  const allShows = await retrieveshows();
  const shows = allShows.slice(startIndex, startIndex + showLimit);
  console.log(shows);

  const catalogsContainer = document.querySelector(".catalogs");
  catalogsContainer.innerHTML = "";

  for (let i = 0; i < shows.length; i++) { 
    const singleShow = shows[i]; 

    const catalogItem = document.createElement("div");
    catalogItem.classList.add("showCatalog");

    const image = document.createElement("img");
    image.src = singleShow.image.medium;
    image.alt = "Movie cover photo";

    const titleContainer = document.createElement("div");
    titleContainer.classList.add("likes-btn");

    const title = document.createElement("h2");
    title.textContent = singleShow.name;

    const likeButton = document.createElement("i");
    likeButton.classList.add("fa-regular", "fa-heart");

    const like = document.createElement("span");
    like.classList.add("count-like");
    const itemId = singleShow.id;
    const initialCount = await getLikeCount(itemId);
    like.textContent = initialCount || 0; // Use the fetched count or set to 0

    const likesText = document.createElement("p");
    likesText.classList.add("like1");
    likesText.textContent = "likes";

    const commentsButton = document.createElement("button");
    commentsButton.type = "submit";
    commentsButton.classList.add("commentsBtn");
    commentsButton.setAttribute("data-index", singleShow.id);
    commentsButton.textContent = "Comments";

   
    likeButton.addEventListener("click", () => {
      let updatedCount = parseInt(like.textContent);
      updatedCount++;

      like.textContent = updatedCount.toString();
      saveLikeCount(itemId, updatedCount);

      updateLikeCount(itemId, updatedCount);
    });

    commentsButton.addEventListener("click", () => {
      openPopup(i);
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

  // Add "Show More" button if there are more shows to display
  const showMoreButton = document.createElement("button");
  showMoreButton.classList.add("showMoreBtn");
  showMoreButton.textContent = "Show More";

  if (startIndex + showLimit < allShows.length) {
    catalogsContainer.appendChild(showMoreButton);
  }

  
  showMoreButton.addEventListener("click", () => {
    startIndex += showLimit; 
    displayShows(); 
  });

  const cardCountElement = document.getElementById("cardCount");
  const cardCount = allShows.length;
  cardCountElement.innerHTML = `(${cardCount})`;
};


/* popup */
const container = document.getElementById("work");

const openPopup = (index) => {
  const popup = document.getElementById(`movie-display-${index}`);
  popup.style.display = "block";
};

const closePopup = (index) => {
  const popup = document.getElementById(`movie-display-${index}`);
  popup.style.display = "none";
};

const fetchMovieData = async () => {
  try {
    const response = await fetch("https://api.tvmaze.com/shows");
    const data = await response.json();

    const movies = Object.values(data.splice(0, 21)); // Convert the response object to an array
    console.log(movies);

    movies.forEach((item, index) => {
      const movieDiv = document.createElement("div");
      movieDiv.id = `movie-display-${index}`;
      movieDiv.className = "popup";
      movieDiv.innerHTML = `
        <div class="popup-content">
          <span id="closePopupButton-${index}" class="close-popup-button"><i class="fa-solid fa-xmark"></i></span>
          <div class="photo1">
            <img class="movie-pic" src="${item.image.medium}" alt="movie photo">
          </div>
          <h2>${item.name}</h2>
          <div class="details">
            <div class="df1">
              <h2>Language: ${item.language}</h2>
              <h2>Estimated time: ${item.runtime} min</h2>
            </div>
            <div class="df2">
              <h2>Movie genres: ${item.genres.join(", ")}</h2>
              <h2>Rating: ${item.rating.average}</h2>
            </div>
          </div>
          <span id="comment-container-${index}"></span >
          <h2>Summary:</h2>
          <p class="summary">
            ${item.summary}
          </p>
          <div class="whole-comment">
            <h3>Add your comments</h3>
          </div>
          <form id="popupForm-${index}" class="form">
            <div class="flex-form">
              <input type="text" name="inputname" placeholder="Your Name" class="name" id="name-${index}"> <br>
              <textarea
                name="inputmessage"
                class="type-text message"
                cols="30"
                rows="10"
                placeholder="Your insight"
                id="message-${index}"
                maxlength="500"
                required
              ></textarea>
            </div>
            <button id="comment" data-index = "${
              index + 1
            }" type="submit">Comment</button>
          </form>
        </div>
      `;

      container.appendChild(movieDiv);

      const closeButton = document.getElementById(`closePopupButton-${index}`);
      closeButton.addEventListener("click", () => {
        closePopup(index);
      });
      addComment(index);

      
    });
  } catch (error) {
    console.error("Error fetching movie data:", error);
  }
};

fetchMovieData();

export default displayShows;
