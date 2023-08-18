export interface IErrorResponse {
  response: {
    data: {
      error: string;
      message: string;
      statusCode: number;
    };
  };
}
