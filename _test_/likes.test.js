const {
  getLikeCount, saveLikeCount,
} = require('./like.js');

global.localStorage = {
  setItem: jest.fn(),
  getItem: jest.fn(),
};

describe('saveLikeCount', () => {
  it('should save the like count to localStorage', () => {
    const itemId = 'exampleItemId';
    const count = 5;

    saveLikeCount(itemId, count);

    expect(localStorage.setItem).toHaveBeenCalledWith(itemId, count.toString());
  });
});

describe('getLikeCount', () => {
  it('should return the like count from localStorage if present', () => {
    const itemId = 'exampleItemId';
    const expectedCount = 5;

    localStorage.getItem.mockReturnValueOnce(expectedCount.toString());

    const likeCount = getLikeCount(itemId);

    expect(localStorage.getItem).toHaveBeenCalledWith(itemId);
    expect(likeCount).toBe(expectedCount);
  });

  it('should return 0 if the like count is not present in localStorage', () => {
    const itemId = 'exampleItemId';

    // Mocking the localStorage.getItem function to return null
    localStorage.getItem.mockReturnValueOnce(null);

    const likeCount = getLikeCount(itemId);

    expect(localStorage.getItem).toHaveBeenCalledWith(itemId);
    expect(likeCount).toBe(0);
  });
});
