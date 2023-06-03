/*eslint-disable */


import { getCommentCount } from "../modules/likesCounter";


test('returns 1 when length is one', () => {
  const container = { textContent: 'lorem' };
  const arr = [{ item: 1 }];
  getLikeCountt(container, arr);
  expect(container.textContent).toBe('Comments (1)');
});

test('returns 2 when length is two', () => {
  const container = { textContent: 'ipsum' };
  const arr = [{ item: 1 }, { item: 2 }];
  getLikeCountt(container, arr);
  expect(container.textContent).toBe('Comments (2)');
});

test('returns 0 when length is 0', () => {
  const container = { textContent: 'hello' };
  const arr = [];
  getLikeCountt(container, arr);
  expect(container.textContent).toBe('Comments (0)');
});
