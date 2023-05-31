const Likes = async () => {
    const ID = ' ';
  const response = await fetch(
    "https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${ID}/likes"
  );
  return response.json();
};

const Comments = async () => {
    const ID = '';
  const response = await fetch(
    "https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${ID}/comments"
  );
  return response.json();
};

export { Likes, Comments };
