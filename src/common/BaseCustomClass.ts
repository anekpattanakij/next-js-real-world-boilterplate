export class BaseCustomClass {
  public toPlainObject() {
    return Object.assign({}, this);
  }
}
