const prisma = require('../utils/prismaClient');

const addPostTag = async (req, res) => {
  try {
    const { postId, tagId } = req.body;

    const createdPostTag = await prisma.postTag.create({
      data: {
        postId,
        tagId,
      },
    });

    res.status(201).json({ postTag: createdPostTag });
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: 'Error created tag' });
  }
};

const findTagOnPost = async (req, res) => {
  const { id } = req.params;
  try {
    const postInTag = await prisma.postTag.findMany({
      where: { postId: parseInt(id) },
    });
    const tagsPost = await prisma.tag.findMany({
      where: { id: { in: [...postInTag.map((el) => el.tagId)] } },
    });
    res.status(201).json(tagsPost);
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: 'Error not found' });
  }
};

const findPostOnTag = async (req, res) => {
  const { id } = req.params;

  try {
    const tagInPost = await prisma.postTag.findMany({
      where: { tagId: parseInt(id) },
    });
    const postTags = await prisma.post.findMany({
      where: { id: { in: [...tagInPost.map((el) => el.postId)] } },
    });
    res.status(201).json(postTags);
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: 'Error not found' });
  }
};

module.exports = {
  addPostTag,
  findTagOnPost,
  findPostOnTag,
};
