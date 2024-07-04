const router = require('express').Router();
const {
  createProperty,
  getAllProperties,
  getSingleFullProperty,
  getSingleCardProperty,
  getAllPropertiesLabel,
  deletePropertyImages,
} = require('../controllers/properties');
const adminValidate = require('../middlewares/adminTokenVerify');
const upload = require('../middlewares/uploadFile');

router.post(
  '/add',
  adminValidate,
  upload.fields([
    { name: 'banner', maxCount: 1 },
    { name: 'bigimg' },
    { name: 'thumbnail' },
    { name: 'mapImg' },
    { name: 'planImg' },
  ]),
  createProperty
);

router.get('/all', getAllProperties);
router.get('/labels', getAllPropertiesLabel);
router.get('/single/:id', getSingleFullProperty);
router.get('/card/:id', getSingleCardProperty);

router.put('/delete', adminValidate, deletePropertyImages);

module.exports = router;
