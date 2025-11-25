import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import streamifier from 'streamifier';
dotenv.config();
cloudinary.config({
cloud_name: process.env.CLOUDINARY_CLOUD_NAME, api_key: process.env.CLOUDINARY_API_KEY, api_secret: process.env.CLOUDINARY_API_SECRET, });
export const cloudinaryUpload = (fileBuffer) => {
return new Promise((resolve, reject) => {
const uploadStream = cloudinary.uploader.upload_stream(
{ folder: 'categories' }, // optional folder in Cloudinary
(error, result) => {
if (error) return reject(error);
resolve(result);
}
);
streamifier.createReadStream(fileBuffer).pipe(uploadStream);
});
};