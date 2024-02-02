import { UserModel, UserRole } from '../user/user.model';

export function isAdmin(user: UserModel): boolean {
  return user.role === UserRole.Admin;
}
