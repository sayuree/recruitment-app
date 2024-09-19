export class AppError extends Error {
  public error_code: number;

  constructor(errorCode: number, message: string) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);

    this.name = this.constructor.name;
    this.error_code = errorCode;
  }
}
