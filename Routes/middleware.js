
const multer = require('multer')
const path = require('path');
const fs = require('fs');
const storage = multer.diskStorage({

    

    destination: function (req, file, cb) {
      cb(null, './Uploads');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
  });
  
  const upload = multer({ storage: storage });

  module.exports ={upload}
