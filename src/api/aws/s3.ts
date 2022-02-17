import { AWS_BUCKET } from '@app/api/constants';
import { FILE_EXTENSION } from '@app/constants';
import AWS from 'aws-sdk';

export const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET
});

export const uploadS3 = async (body: string | Buffer, filename: string) => {
  const params = {
    Bucket: AWS_BUCKET,
    Key: `meme/${filename}${FILE_EXTENSION}`,
    Body: body,
    ContentType: 'image/jpeg'
  };

  try {
    await s3.upload(params).promise();
  } catch (e) {
    console.log('🔥 aws upload error:', e);
  }
};
