const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: '/uploads'});
const fs = require('fs');
const path = require('path');

router.get('/', (req, res) => {
  const {page, total} = req.query;
  res.send({
    status: 'Succesfully',
    message: 'Welcome to learn Express JS tutorial',
    page,
    total
  });
});

router.get('/product/:id', (req, res) => {
  res.json({
    id: req.params.id
  });
});

router.post('/product/', upload.fields([{name: 'image', maxCount: 1}]), (req, res) => {
  const {name, price, stock, status} = req.body;
  const image = req.files['image'][0];
  console.log(image);
  if (image) {
    const target = path.join(__dirname, 'uploads', image.originalname);
    fs.renameSync(image.path, target);
    // res.json({
    //   name,
    //   price,
    //   stock,
    //   status,
    //   image
    // });
    console.log(target);
    res.json(target);
  } else {
    res.json({
      message: 'Failed'
    })
  }
});

// router.get('/:category/:tag', (req, res) => {
//   const {category, tag} = req.params;
//   /* Karena key dan value sama, maka bisa di gabungkan
//   res.json({
//     category: category,
//     tag: tag
//   });*/
//   res.json({category, tag});
// });

module.exports = router;