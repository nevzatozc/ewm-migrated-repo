const MemoryGit = require("./memoryGit");
const simpleGit = require("simple-git");

function createGit() {
  if (process.env.NODE_ENV === "test") {
    return new MemoryGit();
  }

  return simpleGit();
}

module.exports = { createGit };