const db = require('../models');
const Post = db.post;

exports.addPost = async (id, title, description) => {
    const createdDate = new Date();
    const post = new Post({
        id,
        title,
        description,
        createdDate,
    });

    await post.save();
};

exports.updatePost = async (id, title, description) => {
    await Post.findOneAndUpdate({ id: id }, { title, description });
};

exports.deletePost = async (postId) => {
    await Post.deleteOne({ id: postId });
};
exports.getAllPosts = async () => {
    return Post.find();
};

exports.getPostById = async (postId) => {
    return await Post.findOne({ id: postId });
};
