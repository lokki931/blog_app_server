const prisma = require('../utils/prismaClient');

const addTag = async (req, res) => {
  const errors = {};

  if (!req.body.name) {
    errors.name = { message: 'Add name tag' };
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json(errors);
  }

  try {
    const { name } = req.body;

    const createdTag = await prisma.tag.create({
      data: {
        name,
      },
    });

    res.status(201).json({ tag: createdTag });
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: 'Error created tag' });
  }
};
const tagsAll = async (req, res) => {
  try {
    const tags = await prisma.tag.findMany();
    if (!tags) {
      res.status(500).json({ error: 'Error fetching tags' });
    }

    const resObj = {
      tags,
      count: tags.length,
    };

    res.json(resObj);
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: 'Error fetching tags' });
  }
};

const updateTag = async (req, res) => {
  const errors = {};

  if (!req.body.name) {
    errors.name = { message: 'Add name tag' };
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json(errors);
  }

  try {
    const { name } = req.body;
    const { id } = req.params;

    const updateTag = await prisma.tag.update({
      where: { id: parseInt(id) },
      data: {
        name,
      },
    });

    res.status(201).json({ tag: updateTag });
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: 'Error updated tag' });
  }
};

const deleteTag = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.tag.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: 'Tag deleted successfully' });
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: 'Error deleting tag' });
  }
};

module.exports = {
  addTag,
  tagsAll,
  updateTag,
  deleteTag,
};
