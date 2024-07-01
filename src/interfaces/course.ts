interface notieFileDto {
  fileName: string;
  filePath: string;
  fileSize: number;
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

export interface IReferenceList {
  id: number;
  title: string;
  writerName: string;
  createdAt: string;
  num: number;
  isNew?: boolean;
}

export interface IClassRegist {
  action: 'ACCEPT' | 'REFUSE';
}
