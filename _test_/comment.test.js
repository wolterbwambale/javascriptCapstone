/*eslint-disable */

import { addComment } from "../modules/getLikesCount.js";

const fetch = require("node-fetch");

describe("addComment", () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue([
        { item_id: "123", likes: 5 },
        { item_id: "456", likes: 10 },
        { item_id: "789", likes: 7 },
      ]),
    });
  });
  afterEach(() => {
    global.fetch.mockClear();
  });
  it("should return the like count for a valid item ID", async () => {
    const itemId = "456";
    const result = await addComment(itemId);
    expect(result).toBe(10);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      "https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/P8F6LlpZ9NxzdStT1SIa/likes"
    );
  });
});
