const router = require('express').Router();
const { createProperty } = require('../controllers/properties');
const adminValidate = require('../middlewares/adminTokenVerify');
const upload = require('../middlewares/uploadFile');

router.post(
  '/add',
  adminValidate,
  upload.fields([
    { name: 'banner', maxCount: 1 },
    { name: 'bigimg' },
    { name: 'thumbnail' },
  ]),
  createProperty
);

module.exports = router;
