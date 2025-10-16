type TPatient = {
  id: string;
  name?: string;
  age?: number;
  blood_pressure?: string;
  temperature?: number;
  [key: string]: any;
};

type TPagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
};

type TMetadata = {
  timestamp: string;
  requestId: string;
  version: string;
};

type TResponse = {
  data: TPatient[];
  pagination: TPagination;
  metadata: TMetadata;
};
