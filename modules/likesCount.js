/*eslint-disable */
const updateLikeCount = async (itemId) => {
  const ID = "P8F6LlpZ9NxzdStT1SIa";
  const baseUrl =
    "https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/";
  const url = `${baseUrl}apps/${ID}/likes`;

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      "Access-Control-Allow-Origin": "http://localhost:9000",
      "Access-Control-Allow-Methods": "POST",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
    body: JSON.stringify({ item_id: itemId }),
  };

  const response = await fetch(url, requestOptions);
  return response;
};

const saveLikeCount = (itemId, count) => {
  localStorage.setItem(itemId, count.toString());
};

const getLikeCount = async (itemId) => {
  const ID = "P8F6LlpZ9NxzdStT1SIa";
  const baseUrl =
    "https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/";
  const url = `${baseUrl}apps/${ID}/likes`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const likeData = data.filter((item) => item.item_id === itemId);
    if (likeData.length > 0) {
      return likeData[0].likes;
    }
    return 0;
  } catch (error) {
    console.error(error);
    return 0;
  }
};

export { updateLikeCount, saveLikeCount, getLikeCount };
