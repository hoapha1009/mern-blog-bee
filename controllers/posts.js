import { PostModel } from "../models/PostModel.js";

export const getPosts = async (req, res) => {
    try {
        const posts = await PostModel.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const createPost = async (req, res) => {
    try {
        const newPost = req.body;
        const post = new PostModel(newPost);
        await post.save();

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const updatePost = async (req, res) => {
    try {
        const updatePost = req.body;
        const post = await PostModel.findOneAndUpdate(
            { _id: updatePost._id },
            updatePost,
            { new: true }
        ); //{new: true} -> để trả về 1 object mới khi đã cập nhật cho const post

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const deletePost = async (req, res) => {
    try {
        const id = req.params.id;
        await PostModel.findByIdAndDelete(id); //{new: true} -> để trả về 1 object mới khi đã cập nhật cho const post

        res.status(200).json({ message: "Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ error });
    }
};
