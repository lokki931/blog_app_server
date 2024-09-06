const prisma = require('../utils/prismaClient');

const addPostCategory = async (req, res) => {
  try {
    const { postId, categoryId } = req.body;

    const createdPostCategory = await prisma.postCategory.create({
      data: {
        postId,
        categoryId,
      },
    });

    res.status(201).json({ postCategory: createdPostCategory });
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: 'Error created category' });
  }
};

const findCategoryOnPost = async (req, res) => {
  const { id } = req.params;
  try {
    const postInCat = await prisma.postCategory.findMany({
      where: { postId: parseInt(id) },
    });
    const catsPost = await prisma.category.findMany({
      where: { id: { in: [...postInCat.map((el) => el.categoryId)] } },
    });
    res.status(201).json(catsPost);
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: 'Error not found' });
  }
};

const findPostOnCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const catInPost = await prisma.postCategory.findMany({
      where: { categoryId: parseInt(id) },
    });
    const postCats = await prisma.post.findMany({
      where: { id: { in: [...catInPost.map((el) => el.postId)] } },
    });
    res.status(201).json(postCats);
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: 'Error not found' });
  }
};

module.exports = {
  addPostCategory,
  findCategoryOnPost,
  findPostOnCategory,
};
