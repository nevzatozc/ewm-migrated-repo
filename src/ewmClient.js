const fs = require("fs-extra");
const path = require("path");

async function getChangesets() {
  const filePath = path.join(
    __dirname,
    "..",
    "mock-ewm",
    "changesets.json"
  );

  return fs.readJson(filePath);
}

module.exports = {
  getChangesets,
};