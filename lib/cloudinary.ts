import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dqmkau6vi",
  api_key: process.env.CLOUDINARY_API_KEY || "379553679386433",
  api_secret: process.env.CLOUDINARY_API_SECRET || "379553679386433",
  secure: true,
});

export default cloudinary;
