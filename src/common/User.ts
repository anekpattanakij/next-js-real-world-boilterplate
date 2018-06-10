import { BaseCustomClass } from './BaseCustomClass';

export default class User extends BaseCustomClass {
  constructor() {
    super();
    this.cif = null;
    this.displayName = null;
    this.email = null;
    this.password = null;
    this.usertype = null;
    this.accessToken = null;
    this.refreshToken = null;
    this.lastLoginDate = new Date();
    this.registerDate = new Date();
    this.logonStatus = false;
  }

  public cif: number;
  public displayName: string;
  public email: string;
  public password: string;
  public usertype: number;
  public accessToken: string;
  public refreshToken: string;
  public lastLoginDate: Date;
  public registerDate: Date;
  public logonStatus: boolean;

  public encode() {
    return Object.assign({}, this, {
      lastLoginDate: this.lastLoginDate.toString(),
      registerDate: this.registerDate.toString(),
    });
  }

  public static decodeUser(json: any) {
    const user: User = Object.create(User.prototype);
    try {
      return Object.assign(user, json, {
        lastLoginDate: new Date(json.lastLoginDate),
        registerDate: new Date(json.registerDate),
      });
    } catch (err) {
      return user;
    }
  }
}
