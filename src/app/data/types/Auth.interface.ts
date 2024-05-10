export enum UserRole {
  Admin = 'Admin',
  Teacher = 'Teacher',
  Student = 'Student',
}

export interface UserInfo {
  userId: string;
  userRole: UserRole;
  userName: string;
  form?: string; // relevant to teachers ltd to access to a particular class
}
