import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  userid: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  name: String,
  text: {
    type: String,
    required: true
  },
  avatar: String,
  likes: [
    {
      userid: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
  comments: [
    {
      userid: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      timestamp: {
        type: Date,
        default: Date.now
      }
    }
  ],
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const Post = mongoose.model("post", PostSchema);

async function create(userid, name, text, avatar) {
  const post = new Post({ userid, name, text, avatar });
  await post.save();
  return post;
}

async function update(userid, name, text, avatar) {

}

async function find(postid) {
  const post = await Post.findById({ _id: postid });
  if (!post) {
    return {
      found: false,
      message: `No post found`
    };
  } else {
    return {
      found: true,
      post: post
    };
  }
}

async function read(postid) {
  const post = await Post.findById({ _id: postid });
  return post;
}

async function like(userid, postid) {
  const post = await Post.findById({ _id: postid });
  post.likes.unshift({ userid: userid });
  await post.save();
  return post;
}

async function unlike(userid, postid) {
  const post = await Post.findById({ _id: postid });
  const removedIndex = post.likes.map(like => like.userid.toString()).indexOf(userid);
  post.likes.splice(removedIndex, 1);
  await post.save();
  return post;
}

async function addComment(postid, comment) {
  const post = await Post.findById({ _id: postid });
  post.comments.unshift(comment);
  await post.save();
  return post;
}

async function removeComment(postid, userid) {
  const post = await Post.findById({ _id: postid });
  const removedIndex = post.comments.map(comment => comment.userid.toString()).indexOf(userid);
  post.comments.splice(removedIndex, 1);
  await post.save();
  return post;
}

async function destroy(postid) {
  const post = await Post.findById({ _id: postid });
  await post.remove();
}

async function list() {
  const post = await Post.find({}).sort({ timestamp: -1 });
  return post;
}

export { create, update, read, find, like, unlike, addComment, removeComment, destroy, list };