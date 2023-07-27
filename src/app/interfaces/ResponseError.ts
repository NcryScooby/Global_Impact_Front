export interface ResponseError {
  response: {
    data: {
      error: string;
      message: string;
      statusCode: number;
    };
  };
}
