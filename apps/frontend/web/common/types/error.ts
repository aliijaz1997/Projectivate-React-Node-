export interface Error {
  data: {
    statusCode: number;
    message: string | string[];
    error: string;
  };
  status: number;
}

export interface ErrorResponse {
  error: string;
  message: string;
  statusCode: number;
}
