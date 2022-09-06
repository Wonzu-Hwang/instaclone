import AWS from "aws-sdk";

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

export const uploadToS3 = async (file, userId, folderName) => {
  const {
    file: { filename, createReadStream },
  } = await file;
  const readStream = createReadStream();
  const objectName = `${folderName}/${userId}-${Date.now()}-${filename}`;
  try {
    const { Location } = await new AWS.S3()
      .upload({
        Bucket: "instaclone-hwang-first-bucket",
        Key: objectName,
        ACL: "public-read",
        Body: readStream,
      })
      .promise();
    return Location;
  } catch (e) {
    console.log(e);
  }
};

/* export const handleDeletePhotoFromAWS = async fireUrl => {
  const decodedUrl = decodeUrl(fileUrl);
  const filePath = decodedUrl.split("/uploads/")[1];
  const fileName = `uploads/${filePath}`;
  await S3.deleteObject({
    Bucket: "instaclone-hwang-first-bucket",
    Key: fileName,
  }).promise();
};
 */
