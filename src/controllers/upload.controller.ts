import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from '@src/services/upload.service';

@Controller('')
export class UploadController {
    constructor(private readonly uploadService: UploadService) {}

    @Post('/api/files/upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadSingalImage(@UploadedFile() file: any) {
        return await this.uploadService.uploadSingalImage(file);
    }
}
