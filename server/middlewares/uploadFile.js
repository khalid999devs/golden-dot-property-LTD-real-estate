const multer = require('multer');
const { existsSync, mkdirSync } = require('fs');
const { resolve } = require('path');
const { BadRequestError } = require('../errors');
//file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const validFields = /clients|bigimg|thumbnail|banner|mapImg|planImg/;
    if (!file.fieldname) {
      return cb(null, true);
    }
    const isFieldValid = validFields.test(file.fieldname);
    let nameObjs = {};
    if (!isFieldValid) {
      cb(new Error(`Field name didn't match`));
    }

    let destName = resolve(__dirname, `../uploads/${file.fieldname}`);

    const headingStr = req.body.heading
      .split(' ')
      .map((word) => word.toLowerCase())
      .join('-');

    if (file.fieldname === 'bigimg' || file.fieldname === 'thumbnail') {
      destName = resolve(
        __dirname,
        `../uploads/properties/${headingStr}/gallery/${file.fieldname}`
      );
    } else if (
      file.fieldname === 'banner' ||
      file.fieldname === 'mapImg' ||
      file.fieldname === 'planImg'
    ) {
      destName = resolve(
        __dirname,
        `../uploads/properties/${headingStr}/${file.fieldname}`
      );
    }

    if (!existsSync(destName)) {
      try {
        mkdirSync(destName, { recursive: true });
      } catch (error) {
        console.log(error);
      }
    }

    let pathName = `uploads/${file.fieldname}`;

    if (file.fieldname === 'bigimg' || file.fieldname === 'thumbnail') {
      pathName = `uploads/properties/${headingStr}/gallery/${file.fieldname}`;
    } else if (
      file.fieldname === 'banner' ||
      file.fieldname === 'mapImg' ||
      file.fieldname === 'planImg'
    ) {
      pathName = `uploads/properties/${headingStr}/${file.fieldname}`;
    }
    cb(null, pathName);
  },

  filename: (req, file, cb) => {
    let type, fileExt;
    if (
      file.fieldname === 'bigimg' ||
      file.fieldname === 'thumbnail' ||
      file.fieldname === 'planImg'
    ) {
      type = file.mimetype.split('/');
      fileExt = type[type.length - 1];
    } else {
      type = file.originalname.split('.');
      fileExt = type[type.length - 1];
    }

    const headingStr = req.body.heading
      .split(' ')
      .map((word) => word.toLowerCase())
      .join('-');
    req.propertyValue = headingStr;

    let fileName = '';
    if (file.fieldname === 'clients') {
      let { fullName, name } = req.body;

      if (fullName) {
        fullName = fullName.trim();
        fileName = fullName.split(' ')[0].toLowerCase() + `@${Date.now()}`;
        req.userName = fileName;
      } else if (name) {
        fileName = name;
      } else {
        cb(new BadRequestError('fullName should be provided'));
      }
    } else if (file.fieldname === 'bigimg' || file.fieldname === 'thumbnail') {
      fileName = headingStr + '_' + file.fieldname + `@${Date.now()}`;
    } else if (
      file.fieldname === 'banner' ||
      file.fieldname === 'mapImg' ||
      file.fieldname === 'planImg'
    ) {
      fileName = headingStr + '_' + file.fieldname + `@${Date.now()}`;
    } else {
      fileName = file.fieldname + `-${Date.now()}`;
    }
    cb(null, fileName + '.' + fileExt);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|pdf/;

    const mimeType = fileTypes.test(file.mimetype);

    if (mimeType) {
      return cb(null, true);
    } else {
      cb(new Error('only jpg,png,jpeg,pdf is allowed!'));
    }

    cb(new Error('there was an unknown error'));
  },
});

module.exports = upload;
