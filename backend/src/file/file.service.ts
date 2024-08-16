import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import path from 'node:path';

@Injectable()
export class FileService {
  private s3: S3Client;
  private bucketName: string;

  constructor(private configService: ConfigService) {
    this.s3 = new S3Client({
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get<string>(
          'AWS_SECRET_ACCESS_KEY',
        ),
      },
    });
    this.bucketName = this.configService.get<string>('AWS_S3_BUCKET_NAME');
  }

  private generateFileName(userId: number, originalName: string) {
    const fileExtension = path.extname(originalName);
    return `${userId}-${uuidv4()}${fileExtension}`;
  }

  public async uploadFile(userId: number, file: Express.Multer.File) {
    const uploadParams = {
      Bucket: this.bucketName,
      Key: this.generateFileName(userId, file.originalname),
      Body: file.buffer,
    };
    return this.s3.send(new PutObjectCommand(uploadParams));
  }
}
