const { getChangesets } = require("../src/ewmClient");

test("should return changesets", async () => {
  const data = await getChangesets();
  expect(data.length).toBeGreaterThan(0);
});