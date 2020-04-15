import path from 'path';
import multr from 'multer';
import { Injectable, BadRequestException } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { md5 } from '@src/utils/crypto.util';
import { creteUploadFile } from '@src/utils/upload.util';

MulterModule.register({
    storage: multr.memoryStorage(),
});

@Injectable()
export class UploadService {
    public async uploadSingalImage(file: Express.Multer.File) {
        // 实体数据
        const originalName = file.originalname;
        const mimetype: string = file.mimetype;
        const size = file.size;
        const suffix = path.extname(file.originalname);
        if (Number(size) > 1024 * 1024) {
            throw new BadRequestException('图片最大为 1M');
        }
        if (!mimetype.includes('image')) {
            throw new BadRequestException('只能上传图片类型，支持jpg,png');
        }
        const name = md5(file.buffer);
        const fileName = name + suffix;

        // 图片处理
        const url = await creteUploadFile(fileName, file.buffer);
        return {
            url,
        };
    }
}
