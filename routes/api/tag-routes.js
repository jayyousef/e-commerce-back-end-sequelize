const router = require('express').Router();
const {
  Tag,
  Product,
  ProductTag
} = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Category.findAll().then((tagData) => {
    Category.find({
      include: [Product]
    })
    res.json(tagData);
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Category.findByPk(req.params.id).then((tagData) => {
    Category.find({
      include: [Product]
    })
    res.json(tagData);
  });
});

router.post('/', (req, res) => {
  // create a new tag
  Category.create(req.body)
    .then((newTag) => {
      res.json(newTag);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Category.update({
      // All the fields you can update and the data attached to the request body.
      tag_name
    }, {
      // Gets the category based on the id given in the request parameters
      where: {
        id: req.params.id
      }
    })
    .then((updatedTag) => {
      // Sends the updated category as a json response
      res.json(updatedTag);
    })
    .catch((err) => res.json(err));
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
      where: {
        id: req.params.id
      }
    })
    .then((deletedCategory) => {
      res.json(deletedCategory);
    })
    .catch((err) => res.json(err));
});

module.exports = router;