const prisma = require('../utils/prismaClient');

const addComment = async (req, res) => {
  const errors = {};

  if (!req.body.text) {
    errors.title = { message: 'Add title post' };
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json(errors);
  }

  try {
    const userId = req.userId;

    const { text, postId } = req.body;

    const createdCommnet = await prisma.post.create({
      data: {
        text,
        postId,
        authorId: parseInt(userId),
      },
    });

    res.status(201).json({ comment: createdCommnet });
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: 'Error created comment' });
  }
};
const postCommentsAll = async (req, res) => {
  try {
    const { id } = req.params;
    const comments = await prisma.comment.findMany({
      where: { postId: parseInt(id) },
    });

    res.json(comments);
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: 'Error fetching comments' });
  }
};
module.exports = {
  addComment,
  postCommentsAll,
};
