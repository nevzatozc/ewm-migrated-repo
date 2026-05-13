const fs = require("fs");
const path = require("path");

function getChangesets() {
  const filePath = path.join(__dirname, "../changesets.json");

  const raw = fs.readFileSync(filePath, "utf-8");

  return JSON.parse(raw);
}

module.exports = { getChangesets };