export type UserRole = "admin" | "intern" | "attachee" | "volunteer" | "staff";

export type MembershipType = 
  | "life-member" 
  | "ordinary-member" 
  | "youth-in-school" 
  | "youth-out-of-school";

export type User = {
  id: string;
  fullName: string;
  workNumber: string;
  email: string;
  phoneNumber: string;
  role: UserRole;
  membershipType: MembershipType;
  password: string;
  createdAt: string;
  createdBy?: string;
  status: "active" | "inactive";
  mustChangePassword: boolean;
};
