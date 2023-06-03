/*eslint-disable */

import displayShows from "../src/retrieveMovies.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    await displayShows();

    // const AppID = 'DZEORHzdaLtlaHc946Hd';
    const baseUrl =
      "https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/";

    const getComments = async (ID) => {
      const resource =
        "https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/${AppID}/comments?item_id=${ID}";

      const request = await fetch(resource);
      const response = await request.json();
      return response;
    };

    // const userInput = '';
    // const commentInput = '';

    // const callButton = document.querySelectorAll(`.commentsBtn[data-index]`);
    // callButton.forEach(button => {
    //   button.addEventListener('click',(event) => {
    //     const buttonId = event.target.dataset.index;
    //     console.log(buttonId);
    //     const AccessComments = getComments(buttonId);
    //   })
    // })

    // const submitButton = document.querySelectorAll('#comment');
    //     // submitButton.forEach(button => {
    //     //   button.addEventListener('click',(event) => {
    //     //     const buttonId = event.target.dataset.i
  } catch (error) {
    return error;
  }
});
