interface notieFileDto {
  fileName: string;
  filePath: string
  fileSize: number
  id: number;
}

export interface IReferenceDetail {
  id: number;
  title: string;
  main: string;
  writerName: string;
  createdAt: string;
  noteFileDtos?: Array<notieFileDto>;
}