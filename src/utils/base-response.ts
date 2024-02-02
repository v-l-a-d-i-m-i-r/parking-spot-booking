export class BaseResponse<T> {
  public data: T;

  public constructor(data: T) {
    this.data = data;
  }
}
