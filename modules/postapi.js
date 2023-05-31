const postLikes = async (item) => {
    const ID = " ";
  const response = await fetch(
    "https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${ID}/likes",
    {
      method: "POST",
      body: JSON.stringify({ item_id: item }),
      headers: {
        "Content-type": "application/json; Charset=UTF-8",
      },
    }
  );

  return response.text();
};

const postComments = async () => {
  const ID = " ";
  const response = await fetch(
    "https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${ID}/comments",
    {
      method: "POST",
      body: JSON.stringify({
        item_id: "item1",
        username: "Wolter",
        comment: "Goodday",
      }),
      headers: {
        "Content-type": "application/json; Charset=UTF-8",
      },
    }
  );

  return response.text();
};

export { postLikes, postComments };
