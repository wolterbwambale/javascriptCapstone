function saveLikeCount(itemId, count) {
  localStorage.setItem(itemId, count.toString());
}

function getLikeCount(itemId) {
  const count = localStorage.getItem(itemId);
  return count !== null ? parseInt(count, 10) : 0;
}

module.exports = {
  saveLikeCount,
  getLikeCount,
};
