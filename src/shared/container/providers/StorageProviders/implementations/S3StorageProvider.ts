import fs from 'fs'
import path from 'path'
import mime from 'mime'
import aws, { S3 } from 'aws-sdk'

import uploadConfig from '@config/upload'
import IStorageProvider from '../models/IStorageProvider'

class DiskStorageProvider implements IStorageProvider {
  private client: S3

  constructor() {
    this.client = new aws.S3({
      region: 'us-east-1'
    })
  }
  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.uploadsFolder, file)
    const fileType = mime.getType(originalPath)
    const fileContent = await fs.promises.readFile(originalPath)


    if (!fileType) {
      throw new Error('File not found')
    }


    await this.client.putObject({
      Bucket: uploadConfig.config.aws.bucket,
      Key: file,
      ACL: 'public-read',
      Body: fileContent,
      ContentType: fileType,
    }).promise()

    await fs.promises.unlink(originalPath)
    return file

  }
  public async deleteFile(file: string): Promise<void> {
    await this.client.deleteObject({
      Bucket: uploadConfig.config.aws.bucket,
      Key: file
    }).promise()
  }

}

export default DiskStorageProvider
