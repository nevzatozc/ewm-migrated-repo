const { getChangesets } = require("../src/ewmClient");

test("should return valid changesets with correct structure", async () => {
  const data = await getChangesets();

  // 1. basic existence check
  expect(Array.isArray(data)).toBe(true);

  // 2. expected count (şu an 4 changeset bekliyoruz)
  expect(data.length).toBe(5);

  // 3. structure validation
  for (const changeset of data) {
    expect(changeset).toHaveProperty("id");
    expect(changeset).toHaveProperty("author");
    expect(changeset).toHaveProperty("message");
    expect(changeset).toHaveProperty("date");
    expect(Array.isArray(changeset.files)).toBe(true);

    // 4. file integrity check
    for (const file of changeset.files) {
      expect(file).toHaveProperty("path");
      expect(file).toHaveProperty("content");
    }
  }
});