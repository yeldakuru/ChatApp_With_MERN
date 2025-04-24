import { v2 as cloudinary } from "cloudinary";

import { config } from "dotenv";
// Cloudinary servisinin projeye entegre edilmesini sağlar. Yani görsellerin internet üzerinden depolanması ve yönetilmesi için gerekli ayarlar burada yapılır.
config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;