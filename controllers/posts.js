const prisma = require('../utils/prismaClient');

const addPost = async (req, res) => {
  const errors = {};

  if (!req.body.title) {
    errors.title = { message: 'Add title post' };
  }

  if (!req.body.content) {
    errors.content = { message: 'Add content post' };
  }

  if (!req.file) {
    errors.postImg = { message: 'Add image for post' };
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json(errors);
  }

  try {
    const userId = req.userId;

    const { title, content } = req.body;

    const createdPost = await prisma.post.create({
      data: {
        title,
        content,
        authorId: parseInt(userId),
        postImg: `http://localhost:${process.env.PORT}/static/${req.file.filename}`,
      },
    });

    res.status(201).json({ post: createdPost });
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: 'Error created post' });
  }
};
const updatePost = async (req, res) => {
  const errors = {};

  if (!req.body.title) {
    errors.title = { message: 'Add title post' };
  }

  if (!req.body.content) {
    errors.content = { message: 'Add content post' };
  }

  // if (!req.file) {
  //   errors.postImg = { message: 'Add image for post' };
  // }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json(errors);
  }

  try {
    const { id } = req.params;

    const { title, content } = req.body;

    const post = await prisma.post.findUnique({
      where: { id: parseInt(id) },
    });

    let img = post.postImg;

    if (req.file) {
      img = `http://localhost:${process.env.PORT}/static/${req.file.filename}`;
    }

    const updatePost = await prisma.post.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title,
        content,
        postImg: img,
      },
    });

    res.status(201).json({ post: updatePost });
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: 'Error updated post' });
  }
};
const postsAll = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
    });

    res.json(posts);
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: 'Error fetching posts' });
  }
};
const getPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await prisma.post.findUnique({
      where: { id: parseInt(id) },
    });

    if (!post) {
      return res.status(404).json({ error: 'post not found' });
    }

    res.json(post);
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: 'Error fetching post' });
  }
};
const getUserPosts = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      res.status(500).json({ error: 'Error fetching user' });
    }
    const posts = await prisma.post.findMany({
      where: { authorId: parseInt(userId) },
    });
    if (!posts) {
      res.status(500).json({ error: 'Error fetching posts' });
    }

    const resObj = {
      posts,
      count: posts.length,
    };

    res.json(resObj);
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: 'Error fetching posts' });
  }
};
const incrementLike = async (req, res) => {
  const postId = req.body.postId;
  try {
    const likeAdd = await prisma.post.update({
      where: { id: parseInt(postId) },
      data: {
        like: {
          increment: 1,
        },
      },
    });

    res.json(likeAdd);
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: 'Error not add like' });
  }
};

const postPublished = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await prisma.post.update({
      where: { id: parseInt(id) },
      data: {
        published: true,
      },
    });
    res.json(post);
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: 'Error fetching post' });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.post.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: 'Error deleting post' });
  }
};

module.exports = {
  addPost,
  postsAll,
  getPostById,
  incrementLike,
  postPublished,
  getUserPosts,
  updatePost,
  deletePost,
};
