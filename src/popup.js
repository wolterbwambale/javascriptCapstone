
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
    movieDiv.innerHTML = `
      <div class="photo1">
        <span id="closeButton"><i class="fa-solid fa-xmark"></i></span>
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
      <h2>Summary:</h2>
      <p class="summary">
        ${item.summary}
      </p>
      <div class="whole-comment">
        <h3>Add your comments</h3>
      </div>
      <form id="popupForm" class="form">
              <div class="flex-form">
                  <input type="text" name="name" placeholder="Your Name" class="name" id="name"> <br>
                  <textarea
                      name="text-message"
                      class="type-text message"
                      cols="30"
                      rows="10"
                      placeholder="Your insight"
                      id="message"
                      maxlength="500"
                      required
                  ></textarea>
              </div>
              
              <button id="commentsBtn" type="submit">Comment</button>
          </form>
    `;
  
    container.appendChild(movieDiv);
  });
  
  const comment = document.createElement('div');
  comment.className = 'pop';
  container.appendChild(comment);
  
  const commentsBtn = document.getElementById('closeButton');
  commentsBtn.addEventListener('click', function() {
    comment.style.display = 'block';
  });
  
