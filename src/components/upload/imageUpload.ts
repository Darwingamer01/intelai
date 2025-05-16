import cloudinary from "config/cloudinary.config";


const uploadImage = async (filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {folder: 'intelAi'}); 
        console.log('Upload SuccessFull');
        console.log(result.secure_url);   
    } catch (error) {
        console.error('Upload Failed', error);
    }
};


export default uploadImage;