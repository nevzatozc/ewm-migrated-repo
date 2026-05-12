class MemoryGit {
  constructor() {
    this.commits = [];
    this.files = {};
  }

  addFile(path, content) {
    this.files[path] = content;
  }

  commit(message, author, date) {
    this.commits.push({
      message,
      author,
      date,
      snapshot: { ...this.files }
    });
  }

  log() {
    return this.commits;
  }
}

module.exports = MemoryGit;