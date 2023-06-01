async function getAppId(url, data) {
  // Create a new Request object.
  const request = new Request(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  // Make the request.
  const response = await fetch(request);
  // Check the response status code.
  if (response.status === 200) {
    // The request was successful.
    const data = await response.json();
    console.log(data);
  } else {
    // The request failed.
    throw new Error(`Request failed with status code ${response.status}`);
  }
}


//popub
const popupFormContainer = document.getElementById("popupFormContainer");
const commentsBtn = document.getElementById("commentsBtn");

commentsBtn.addEventListener("click", function () {
  popupFormContainer.classList.toggle("open");
});

const closeForm = function () {
  popupFormContainer.classList.remove("open");
};

const closeButton = document.getElementById("closeButton");
closeButton.addEventListener("click", closeForm);

popupFormContainer.addEventListener("click", function (event) {
  if (event.target === popupFormContainer) {
    closeForm();
  }
});
