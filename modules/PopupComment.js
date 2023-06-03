/*eslint-disable */


class PopupComment {
  constructor() {
    this.appId = "P8F6LlpZ9NxzdStT1SIa";
    this.baseUrl =
      "https://us-central1-involvement-api.cloudfunctions.net/capstoneApi";
  }

  postComment(itemId, username, comment) {
    const url = `${this.baseUrl}/apps/${this.appId}/comments`;
    console.log(url);
    const body = {
      item_id: itemId,
      username,
      comment,
    };

    return new Promise((resolve, reject) => {
      fetch(url, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      })
        .then((response) => {
          if (response.ok) {
            resolve(response.status);
          } else {
            throw new Error(`Failed to post comment: ${response.status}`);
          }
        })
        .catch(() => {
          reject(new Error("Failed to post comment"));
        });
    });
  }

  getComments(itemId) {
    const url = `${this.baseUrl}/apps/${this.appId}/comments?item_id=${itemId}`;

    return new Promise((resolve, reject) => {
      fetch(url)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error(`Failed to get comments: ${response.status}`);
        })
        .then((data) => {
          console.log(data.itemId);
          resolve(data);
        })
        .catch(() => {
          reject(new Error("Failed to get comments"));
        });
    });
  }

  displayComments(itemId) {
    const commentContainer = document.getElementById(
      `comment-container-${itemId}`
    );
    this.getComments(itemId).then((comments) => {
      console.log(comments);
      if (comments.length > 0) {
        const list = document.createElement("ul");
        const h3 = document.createElement("h1");
        list.appendChild(h3);
        h3.innerHTML = `Comments(${comments.length})`;
        comments.forEach((comment) => {
          const li = document.createElement("li");
          li.innerHTML = `${comment.creation_date} ${comment.username} ${comment.username}`;
          list.appendChild(li);
        });
        commentContainer.appendChild(list);
      }
    });
  }
}

export default PopupComment;
