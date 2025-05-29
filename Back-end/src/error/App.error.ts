export class appError extends Error {
  public status: number;

  constructor(message: string, statsu: number = 400) {
    super(message);
    this.status = this.status;
  }
}
