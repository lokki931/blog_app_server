const prisma = require('../utils/prismaClient');

const addCategory = async (req, res) => {
  const errors = {};

  if (!req.body.name) {
    errors.name = { message: 'Add name category' };
  }

  if (!req.file) {
    errors.categoryImg = { message: 'Add image for category' };
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json(errors);
  }

  try {
    const { name } = req.body;

    const createdCategory = await prisma.category.create({
      data: {
        name,
        categoryImg: `http://localhost:${process.env.PORT}/static/${req.file.filename}`,
      },
    });

    res.status(201).json({ category: createdCategory });
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: 'Error created category' });
  }
};
const categoriesAll = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    if (!categories) {
      res.status(500).json({ error: 'Error fetching categories' });
    }

    const resObj = {
      categories,
      count: categories.length,
    };

    res.json(resObj);
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: 'Error fetching categories' });
  }
};

const updateCategory = async (req, res) => {
  const errors = {};

  if (!req.body.name) {
    errors.name = { message: 'Add name category' };
  }

  // if (!req.file) {
  //   errors.categoryImg = { message: 'Add image for category' };
  // }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json(errors);
  }

  try {
    const { name } = req.body;
    const { id } = req.params;

    const post = await prisma.category.findUnique({
      where: { id: parseInt(id) },
    });

    let img = post.categoryImg;

    if (req.file) {
      img = `http://localhost:${process.env.PORT}/static/${req.file.filename}`;
    }

    const updateCategory = await prisma.category.update({
      where: { id: parseInt(id) },
      data: {
        name,
        categoryImg: img,
      },
    });

    res.status(201).json(updateCategory);
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: 'Error updated category' });
  }
};
const getCategoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await prisma.category.findUnique({
      where: { id: parseInt(id) },
    });

    if (!category) {
      return res.status(404).json({ error: 'category not found' });
    }

    res.json(category);
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: 'Error fetching category' });
  }
};
const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.category.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: 'Error deleting category' });
  }
};

module.exports = {
  addCategory,
  getCategoryById,
  categoriesAll,
  updateCategory,
  deleteCategory,
};
