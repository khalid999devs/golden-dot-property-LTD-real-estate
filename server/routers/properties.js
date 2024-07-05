const router = require('express').Router();
const {
  createProperty,
  getAllProperties,
  getSingleFullProperty,
  getSingleCardProperty,
  getAllPropertiesLabel,
  deletePropertyImages,
  updatePropertyImages,
  updatePropertyData,
  deleteProperty,
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

router.put(
  '/updateImg',
  adminValidate,
  upload.fields([
    { name: 'banner', maxCount: 1 },
    { name: 'bigimg' },
    { name: 'thumbnail' },
    { name: 'mapImg', maxCount: 1 },
    { name: 'planImg', maxCount: 1 },
  ]),
  updatePropertyImages
);
router.put('/data-update/:id', adminValidate, updatePropertyData);
router.put('/delete', adminValidate, deletePropertyImages);

router.delete('/delete-property/:id', adminValidate, deleteProperty);

module.exports = router;
