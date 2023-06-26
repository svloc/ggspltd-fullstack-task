const postService = require('../services/post.service');

exports.addPost = async (req, res) => {
  try {
    const { title, description } = req.body;
    const id = parseInt(req.body.id);
    await postService.addPost(id, title, description);
    res.status(201).send({ message: 'Post added successfully!' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { title, description } = req.body;
    const id = parseInt(req.params.id);
    await postService.updatePost(id, title, description);
    res.status(200).send({ message: 'Post updated successfully!' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const postId = parseInt(req.params.id);
    await postService.deletePost(postId);
    res.status(200).send({ message: 'Post deleted successfully!' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await postService.getAllPosts();
    res.status(200).send(posts);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await postService.getPostById(postId);
    res.status(200).send(post);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
