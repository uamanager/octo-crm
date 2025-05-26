export abstract class Model<T extends object> {
  constructor(data: T) {
    Object.assign(this, data);
  }
}
