import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'image' && file.mimetype.startsWith('image/')) {
      cb(null, 'uploads/imgProduct');
    } else if (file.fieldname === 'detailImages' && file.mimetype.startsWith('image/')) {
      cb(null, 'uploads/imgProduct');
    } else if (file.mimetype.startsWith('audio/')) {
      cb(null, 'uploads/songs/songFiles');
    } else {
      console.log("---1", file.mimetype);
      console.log(file);
      cb({ error: 'Mime type not supported' });
    }
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now();
    const extension = file.originalname.split('.').pop();
    const randomNumbers = Math.random().toString().substring(2, 8); // Get 6 random numbers from a random string
    const newFileName = `${timestamp}${randomNumbers}.${extension}`;
    cb(null, newFileName);
  }
});

const upload = multer({ storage: storage });

export default upload;