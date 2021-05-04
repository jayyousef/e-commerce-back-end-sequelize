const router = require('express').Router();
const { Category, Product } = require('../../models');


// The `/api/categories` endpoint
router.get('/', (req, res) => {
  // find all categories
  Category.findAll().then((categoryData) => {
    Category.findAll({include: [Product]})
      res.json(categoryData);
    }).catch((err) => {
      res.json(err);
    });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findByPk(req.params.id).then((categoryData) => {
    Category.findAll({include: [Product]})
    res.json(categoryData);
  })  .catch((err) => {
    res.json(err);
  });
});

router.post('/', (req, res) => {
  // create a new category
  try{
    const categoryData = Category.create(req.body)
  .then((categoryData) => {
    res.json(categoryData);
  })
  .catch((err) => {
    res.json(err);
  })
}
catch(err){
  res.status(500).json(err)
};
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body,{where:{id:req.params.id}}
    )
      .then((updatedCategory) => {
        // Sends the updated category as a json response
        res.json(updatedCategory);
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
