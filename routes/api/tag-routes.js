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
  Tag.findAll().then((tagData) => {
    Tag.findAll({
      include: [Product]
    })
    res.json(tagData);
  })  .catch((err) => {
    res.json(err);
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findByPk(req.params.id).then((tagData) => {
    Tag.findAll({
      include: [Product]
    })
    res.json(tagData);
  })  .catch((err) => {
    res.json(err);
  });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
    .then((newTag) => {
      res.json(newTag);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update({
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
  Tag.destroy({
      where: {
        id: req.params.id
      }
    })
    .then((deletedTag) => {
      res.json(deletedTag);
    })
    .catch((err) => res.json(err));
});

module.exports = router;