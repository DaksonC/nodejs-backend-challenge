class Post {
  constructor(title, body, tags) {
    this.id = uuidv4();
    this.title = title;
    this.body = body;
    this.tags = tags || [];
  }
}

module.exports = Post;