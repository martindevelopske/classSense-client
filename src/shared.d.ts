
// types.ts
// User Model Type
type UserResponse = {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  password?: string;
  createdAt?: Date;
  roles?: UserRoleaResponses[];
  sessions?: SessionMembersResponse[];
  attendance?: AttendanceResponse[];
};

// Role Model Type
type RoleResponse = {
  id: string;
  roleName: string;
  roleDescription?: string;
  users?: UserRolesResponse[];
};

// Instructor Model Type
type InstructorResponse = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password?: string;
  createdAt?: Date;
  role?: UserRolesResponse[];
  sessions?: SessionResponse[];
};

// UserRoles Model Type
type UserRolesResponse = {
  id: string;
  role: RoleResponse;
  roleId: string;
  user?: UserResponse;
  userId?: string;
  instructor?: InstructorResponse;
  instructorId?: string;
};

// Session Model Type
type SessionResponse = {
  id: string;
  name: string;
  location?: LocationResponse;
  locationId?: string;
  status: string;
  day: string;
  sessionTime?: Date;
  createdAt: Date;
  members?: SessionMembersResponse[];
  attendance?: AttendanceResponse[];
  instructor?: InstructorResponse;
  instructorId: string;
};
interface SingleSessionResponse extends SessionResponse {}
// Location Model Type
type LocationResponse = {
  id: string;
  locationName: string;
  locationDescription?: string;
  capacity?: number;
  Sessions?: SessionResponse[];
};

// SessionMembers Model Type
type SessionMembersResponse = {
  id: string;
  session: SessionResponse;
  sessionId: string;
  user: UserResponse;
  userId: string;
};

// Attendance Model Type
type AttendanceResponse = {
  id: string;
  user: UserResponse;
  userId: string;
  session: SessionResponse;
  sessionId: string;
  createdAt: Date;
};

interface LoginResponse {
  user: User;
  userType: "student" | "instructor" | "admin";}
