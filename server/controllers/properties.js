const { clients, properties } = require('../models');
const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} = require('../errors');
const mailer = require('../utils/sendMail');
const { fromArrayToObjId } = require('../utils/utilFunc');
const deleteFile = require('../utils/deleteFile');

const createProperty = async (req, res) => {
  let data = req.body;
  data.value = req.propertyValue;

  if (req.files) {
    const uploadedFiles = req.files;

    if (uploadedFiles.bigimg?.length > 0) {
      const objIdBigImgs = fromArrayToObjId(
        uploadedFiles.bigimg,
        'originalname'
      );
      const objIdThumbnail = fromArrayToObjId(
        uploadedFiles.thumbnail,
        'originalname'
      );
      let dataGalleryImgs = JSON.parse(data.galleryImgs);

      dataGalleryImgs.map((item) => {
        item.url = objIdBigImgs[item.id].path;
        item.thumbnail = objIdThumbnail[item.id].path;
        item.serverImg = {
          bigImg: objIdBigImgs[item.id],
          thumbnail: objIdThumbnail[item.id],
        };
        return item;
      });

      data.galleryImgs = JSON.stringify(dataGalleryImgs);
    }
    if (uploadedFiles.planImg?.length > 0) {
      const objIdPlanImgs = fromArrayToObjId(
        uploadedFiles.planImg,
        'originalname'
      );
      let dataKeyplans = JSON.parse(data.keyPlans);

      dataKeyplans.map((item) => {
        item.planImg = objIdPlanImgs[item.id].path;
        item.serverImg = objIdPlanImgs[item.id];
        return item;
      });
      data.keyPlans = JSON.stringify(dataKeyplans);
    }
    if (uploadedFiles.banner?.length > 0) {
      data.img = uploadedFiles.banner[0].path;
    }
    if (uploadedFiles.mapImg?.length > 0) {
      let dataLocation = JSON.parse(data.location);
      dataLocation.mapImg = uploadedFiles.mapImg[0].path;
      dataLocation.serverImg = uploadedFiles.mapImg[0];
      data.location = JSON.stringify(dataLocation);
    }
  }

  await properties.create(data);

  res.json({
    succeed: true,
    msg: 'Successfully added the Property!',
  });
};

const getAllProperties = async (req, res) => {
  let result = await properties.findAll({
    attributes: [
      'heading',
      'value',
      'img',
      'subText',
      'category',
      'isAvailable',
      'createdAt',
      'updatedAt',
    ],
  });

  result.forEach((item) => {
    item.dataValues.category = JSON.parse(item.dataValues.category);
  });

  res.json({
    succeed: true,
    result,
    msg: 'Successfully fetched all properties!',
  });
};

const getAllPropertiesLabel = async (req, res) => {
  let result = await properties.findAll({ attributes: ['heading', 'value'] });
  result = result.map((item) => {
    return { title: item.dataValues.heading, value: item.dataValues.value };
  });
  res.json({
    succeed: true,
    result,
    msg: 'Successfully fetched property labels',
  });
};

const getSingleCardProperty = async (req, res) => {
  const valId = req.params.id;
  let result = await properties.findOne({
    attributes: [
      'heading',
      'value',
      'img',
      'subText',
      'category',
      'location',
      'isAvailable',
      'createdAt',
      'updatedAt',
    ],
    where: { value: valId },
  });

  result.dataValues.category = JSON.parse(result.dataValues.category);

  res.json({
    succeed: true,
    result,
    msg: 'Successfully fetched all properties!',
  });
};

const getSingleFullProperty = async (req, res) => {
  const valId = req.params.id;
  let result = await properties.findOne({ where: { value: valId } });

  if (result?.dataValues?.heading) {
    result.dataValues.category = JSON.parse(result.dataValues.category);
    result.dataValues.projectInfos = JSON.parse(result.dataValues.projectInfos);
    result.dataValues.features = JSON.parse(result.dataValues.features);
    result.dataValues.videos = JSON.parse(result.dataValues.videos);
    result.dataValues.virtualTourVideo = JSON.parse(
      result.dataValues.virtualTourVideo
    );
    result.dataValues.location = JSON.parse(result.dataValues.location);
    result.dataValues.galleryImgs = JSON.parse(result.dataValues.galleryImgs);
    result.dataValues.keyPlans = JSON.parse(result.dataValues.keyPlans);
  }

  res.json({
    succeed: true,
    result,
    msg: 'Successfully fetched the Property!',
  });
};

const deletePropertyImages = async (req, res) => {
  const { mode, propertyId, imgId } = req.body;
  let property = await properties.findOne({
    attributes: ['id', 'img', 'galleryImgs', 'keyPlans', 'location'],
    where: { id: propertyId },
  });

  if (mode === 'banner') {
    deleteFile(property.img);
    property.img = '';
  } else if (mode === 'galleryImgs') {
    let gImgs = [];
    JSON.parse(property.galleryImgs).forEach((item) => {
      if (item.id === imgId) {
        deleteFile(item.thumbnail);
        deleteFile(item.url);
      } else gImgs.push(item);
    });
    property.galleryImgs = JSON.stringify(gImgs);
  } else if (mode === 'keyPlans') {
    let kPlans = [];
    JSON.parse(property.keyPlans).forEach((item) => {
      if (item.id === imgId) {
        deleteFile(item.planImg);
      } else kPlans.push(item);
    });
    property.keyPlans = JSON.stringify(kPlans);
  } else if (mode === 'location') {
    let newLoc = JSON.parse(property.location);
    deleteFile(newLoc.mapImg);
    property.location = JSON.stringify({
      ...newLoc,
      mapImg: '',
      serverImg: {},
    });
  }

  await property.save();

  // property.dataValues.galleryImgs = JSON.parse(property.dataValues.galleryImgs);
  // property.dataValues.keyPlans = JSON.parse(property.dataValues.keyPlans);
  // property.dataValues.location = JSON.parse(property.dataValues.location);

  res.json({
    succeed: true,
    msg: 'Successfully deleted!',
  });
};

module.exports = {
  createProperty,
  getAllProperties,
  getSingleFullProperty,
  getSingleCardProperty,
  getAllPropertiesLabel,
  deletePropertyImages,
};
