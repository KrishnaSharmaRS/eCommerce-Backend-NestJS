import { Injectable } from "@nestjs/common";
import { v4 as uuid } from "uuid";
import { extension } from "mime";
import * as AWS from "aws-sdk";
import { awsS3AccessKeyId, awsS3Bucket, awsS3SecretAccessKey } from "src/configs/credentials.config";

@Injectable()
export class AwsS3Service {
  Bucket = awsS3Bucket;

  s3 = new AWS.S3({
    accessKeyId: awsS3AccessKeyId,
    secretAccessKey: awsS3SecretAccessKey,
  });

  async uploadFile(file: Express.Multer.File, fileName = uuid() + "." + extension(file.mimetype)) {
    const params: AWS.S3.PutObjectRequest = {
      Bucket: this.Bucket,
      Key: fileName,
      Body: file.buffer,
      ACL: "public-read",
      ContentType: file.mimetype,
      ContentDisposition: "inline",
    };

    await this.s3.upload(params).promise();

    return `https://${this.Bucket}.s3.amazonaws.com/${fileName}`;
  }
}
