import multer from 'multer';
export const upload = multer({
storage: multer.memoryStorage(), // stores files in buffer
limits: { fileSize: 5 * 1024 * 1024 }, fileFilter: (req, file, cb) => {
const allowedTypes = /jpeg|jpg|png/;
const ext = allowedTypes.test(file.originalname.toLowerCase());
const mime = allowedTypes.test(file.mimetype);
cb(null, ext && mime);
}, });