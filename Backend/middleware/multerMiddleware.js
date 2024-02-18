import multer from "multer";

//image storage path
const imgconfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    callback(null, `image-${Date.now()}.${file.originalname}`);
  },
});
// image filter
const isImage = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(new Error("Only Image is Allowed!"));
  }
};

const upload = multer({
  storage: imgconfig,
  fileFilter: isImage,
});

export default upload;
