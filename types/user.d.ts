export type UserRole = 'ADMIN' | 'STAFF';

export interface UserPayload {
  id: number;
  role: UserRole;
  email: string;
  name: string;
  businessId:number
}
