import { UserRole } from './UserRole';

export interface User {
  id: number;
  fullName: string | null;
  phoneNumber: string | null;
  email: string | null;
  totalSpending: number | null;
  avatar: string | null;
  userName: string;
  createDate: string;
  role?: UserRole;
  token?: string;
}
