export type TPatient = {
  patient_id: string;
  name?: string;
  age?: number;
  blood_pressure?: string;
  temperature?: number;
  [key: string]: any;
};

export type TPagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
};

export type TMetadata = {
  timestamp: string;
  requestId: string;
  version: string;
};

export type TResponse = {
  data: TPatient[];
  pagination: TPagination;
  metadata: TMetadata;
};

export type TOutput = {
  high_risk_patients: string[];
  fever_patients: string[];
  data_quality_issues: string[];
};
