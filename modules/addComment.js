/*eslint-disable */
import PopupComment from "./PopupComment.js";

const addComment = (itemId) => {
  const commentForm = document.getElementById(`popupForm-${itemId}`);

  commentForm.addEventListener("submit", (e) => {
    e.preventDefault();

    console.log(itemId);
    console.log(commentForm.inputmessage.value);
    const comment = new PopupComment();
    comment.postComment(
      itemId,
      commentForm.inputname.value,
      commentForm.inputmessage.value
    );
    comment.displayComments(itemId);
    commentForm.inputname.value = "";
    commentForm.inputmessage.value = "";
  });
};

export default addComment;
