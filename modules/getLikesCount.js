/*eslint-disable */
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

export default getLikeCount;
