const forEach = require('./commnetCounter.js');

describe('forEach', () => {
  it('should call the callback function for each item in the array', () => {
    const items = [1, 2, 3, 4, 5];
    const callback = jest.fn();

    forEach(items, callback);

    expect(callback).toHaveBeenCalledTimes(items.length);
    expect(callback).toHaveBeenCalledWith(1);
    expect(callback).toHaveBeenCalledWith(2);
    expect(callback).toHaveBeenCalledWith(3);
    expect(callback).toHaveBeenCalledWith(4);
    expect(callback).toHaveBeenCalledWith(5);
  });
});
