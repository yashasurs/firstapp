import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME , 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const cloudinaryFileUpload = async (filePath) => {
    try {
        const response = await cloudinary.uploader.upload(filePath, {
            resource_type: "auto"
        });
        fs.unlinkSync(filePath); // Delete the file after upload
        return response.secure_url;
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        throw error;
    }
}
export default cloudinaryFileUpload;