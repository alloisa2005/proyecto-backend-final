const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './src/public/user_images')
  },
  filename: (req, file, cb) => {    
    let fotoName = Date.now() + path.extname(file.originalname);
    req.fotoName = fotoName;
    cb(null, fotoName);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;