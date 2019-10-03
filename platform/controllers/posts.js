import DBG from "debug";
import { validationResult } from "express-validator";
import * as UserModel from "../models/users/users-queries";
import * as PostModel from "../models/posts/posts-mongodb";

const debug = DBG("platolio:controller-posts");
const error = DBG("platolio:error-posts");

export default {
  // @access Private
  // @route POST /posts/add
  async create(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    try {
      let user = await UserModel.findById(req.user.id);
      if (user.found) {
        user = user.sanitize;
        const post = await PostModel.create(user._id, user.name, req.body.text, user.avatar);
        res.json(post);
      } else {
        return res.status(404).json({ message: "User Not Found" });
      }
    } catch (err) {
      error(err.stack);
      res.status(500).send("Server Error! Something got wrong when creating post");
    }
  },

  async update(req, res, next) {

  },

  // @access Private
  // @route GET /posts/read:id
  async read(req, res, next) {
    try {
      let post = await PostModel.find(req.params.post_id);
      if (post.found) {
        post = await PostModel.read(req.params.post_id);
      } else {
        return res.status(404).json({ message: post.message });
      }
      res.json(post);
    } catch (err) {
      if (err.kind === "ObjectId") {
        return res.status(404).json({ message: `No post of id: ${postid} found` });
      }
      error(err.stack);
      res.status(500).send("Server Error! Something got wrong when reading post");
    }
  },

  // @access Private
  // @route PUT /posts/like/:post_id
  // @desc Like a Post
  async like(req, res, next) {
    try {
      let post = await PostModel.find(req.params.post_id);
      if (post.found) {
        post = post.post;
        if (post.likes.filter(like => like.userid.toString() === req.user.id).length > 0) {
          return res.status(400).json({ message: "Post already liked" })
        }
        post = await PostModel.like(req.user.id, req.params.post_id);
      }
      res.json(post.likes);
    } catch (err) {
      if (err.kind === "ObjectId") {
        return res.status(404).json({ message: `No post found. It may have been deleted!` });
      }
      error(err.stack);
      res.status(500).send("Server Error! Something got wrong when liking post");
    }
  },

  // @access Private
  // @route PUT /posts/unlike/:post_id
  async unlike(req, res, next) {
    try {
      let post = await PostModel.find(req.params.post_id);
      if (post.found) {
        post = post.post;
        if (post.likes.filter(like => like.userid.toString() === req.user.id).length === 0) {
          return res.status(400).json({ message: "Post has not been yet liked" });
        }
        post = await PostModel.unlike(req.user.id, req.params.post_id);
      }
      res.json(post.likes);
    } catch (err) {
      if (err.kind === "ObjectId") {
        return res.status(404).json({ message: `No post found. It may have been deleted!` });
      }
      error(err.stack);
      res.status(500).send("Server Error! Something got wrong when unliking post");
    }
  },

  // @access Private
  // @route POST /posts/comments/:post_id
  // @desc Comment a Post
  async addComment(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let post = await PostModel.find(req.params.post_id);
      if (post.found) {
        const user = await UserModel.findById(req.user.id);
        const comment = {
          userid: req.user.id,
          text: req.body.text,
          name: user.sanitize.name,
          avatar: user.sanitize.avatar,
        }
        console.log(comment);
        console.log(user);
        post = await PostModel.addComment(req.params.post_id, comment);
      }
      res.json(post.comments);
    } catch (err) {
      if (err.kind === "ObjectId") {
        return res.status(404).json({ message: `No post found. It may have been deleted!` });
      }
      error(err.stack);
      res.status(500).send("Server Error! Something got wrong when adding comment");
    }
  },

  // @acces Private
  // @route DELETE /posts/comments/remove/:post_id/:comment_id
  async removeComment(req, res, next) {
    try {
      let post = await PostModel.find(req.params.post_id);
      if (post.found) {
        post = post.post;
        // @desc  Pull out comments 
        const comment = post.comments.find(comment => comment.id === req.params.comment_id);
        if (!comment) {
          return res.status(404).json({ message: "Comment not found" });
        }

        // @desc Check if user is authorized to delete comment
        if (comment.userid.toString() !== req.user.id) {
          return res.status(401).json({ message: "User not authorized" });
        }
        post = await PostModel.removeComment(req.params.post_id, req.user.id);
      }
      res.json(post.comments);
    } catch (err) {
      if (err.kind === "ObjectId") {
        return res.status(404).json({ message: `No post found. It may have been deleted!` });
      }
      error(err.stack);
      res.status(500).send("Server Error! Something got wrong when deleting comment");
    }
  },

  // @access Private
  // @route DELTE /posts/destroy/:post_id
  async destroy(req, res, next) {
    try {
      let post = await PostModel.find(req.params.post_id);
      if (post.found) {
        post = post.post;
        if (post.userid.toString() !== req.user.id) {
          return res.status(401).json({ message: "User not authorized" });
        }
        await PostModel.del(req.params.post_id);
      } else {
        return res.status(404).json({ message: post.message });
      }
      res.json("Post Deleted Successfully!");
    } catch (err) {
      if (err.kind === "ObjectId") {
        return res.status(404).json({ message: `No post found` });
      }
      error(err.stack);
      res.status(500).send("Server Error! Something got wrong when destroying post");
    }
  },

  // @access Private
  // @route /posts
  async list(req, res, next) {
    try {
      const posts = await PostModel.list();
      res.json(posts);
    } catch (err) {
      error(err.stack);
      res.status(500).send("Server Error! Something got wrong when listing post");
    }
  }
}
