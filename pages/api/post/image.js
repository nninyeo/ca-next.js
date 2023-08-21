
import aws from 'aws-sdk'

export default async function handler(req, res){
    aws.config.update({
      accessKeyId: process.env.AWS_S3_ACCESS_KEY,
      secretAccessKey: process.env.AWS_S3_SECRET_KEY,
      region: 'ap-northeast-2',
      signatureVersion: 'v4',
    })

    const s3 = new aws.S3();
    const url = await s3.createPresignedPost({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Fields: { key : req.query.file },
      Expires: 60, // seconds
      Conditions: [
        ['content-length-range', 0, 2048576], //파일용량 ~2MB
      ],
    })

    res.status(200).json(url)
}  