const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const dotenv = require('dotenv');

dotenv.config();

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

const uploadToS3 = async (file, folderPath = '') => {
    try {
        const fullBucketName = process.env.AWS_BUCKET_NAME;
        const [bucketName, ...pathParts] = fullBucketName.split('/');
        const initialPath = pathParts.join('/');

        let key = file.originalname.replace(/\s+/g, '_');
        const timestamp = Date.now();
        key = `${timestamp}-${key}`;

        if (folderPath) {
            key = `${folderPath}/${key}`;
        }

        if (initialPath) {
            key = `${initialPath}/${key}`;
        }

        const uploadParams = {
            Bucket: bucketName,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
        };

        await s3Client.send(new PutObjectCommand(uploadParams));

        const url = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

        return url;
    } catch (error) {
        console.error('S3 Upload Error:', error);
        throw new Error('Image upload failed');
    }
};

module.exports = { uploadToS3 };
