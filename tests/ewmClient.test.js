//mock data bozulmadı ve format doğru
const ewmClient = require("../src/ewmClient");

describe("EWM Client", () => {
  test("should return changesets", async () => {
    const data = await ewmClient.getChangesets();

    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);

    expect(data[0]).toHaveProperty("id");
    expect(data[0]).toHaveProperty("files");
  });
});