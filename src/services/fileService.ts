import { Repository } from 'typeorm';
import { IFileUploadRequest } from '../interfaces/file';
import { AppDataSource } from '../config/data-source';
import { File } from '../entity/File';

class FileService {
  private fileRepository: Repository<File>;

  constructor() {
    this.fileRepository = AppDataSource.getRepository(File);
  }

  public async create(fileData: IFileUploadRequest): Promise<File> {
    const createdFile = this.fileRepository.create(fileData);
    return await this.fileRepository.save(createdFile);
  }
}

export const fileService = new FileService();
