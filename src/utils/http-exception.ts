export class HttpException extends Error {
  public message: string;
  public status?: number;

  constructor(message: string, status = 500) {
    super();
    this.message = message;
    this.status = status;
  }
}
