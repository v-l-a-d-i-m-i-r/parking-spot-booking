export enum UserRole {
  Admin = 'admin',
  Regular = 'regular',
}

export class UserModel {
  public id: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public role: UserRole;
}

export class PrivateUserModel extends UserModel {
  public token: string;
}
