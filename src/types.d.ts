// //shared types from node server
// interface UserResponse {
//   id: string;
//   firstname: string;
//   lastname: string;
//   email: string;
//   createdAt: Date;
// }
// interface User  {
//   user:UserResponse  | undefined;
//   userType: string | undefined;
// };

type StoreState = {
  user: User | null;
  setUser: (userObj: User | null) => void;
};

// type Instructor = {
//   id: string;
//   firstname: string;
//   lastname: string;
//   email: string;
//   password: number;
//   createdAt: Date;
// };
// type InstructorT = {
//   id: string;
//   firstname?: string;
//   lastname?: string;
//   email: string;
// };
// type Usert = {
//   id: string;
//   firstname: string;
//   lastname: string;
//   email: string;
// };
// type Session = {
//   id: string;
//   name: string;
//   instructorId: string;
//   status: string;
//   day: string;
//   locationId: string;
//   createdAt: Date;
// };
//
// type SessionProps = {
//   id: string;
//   sessionId: string;
//   userId: string;
//   session: Session;
//   instructor: InstructorT;
// };
// type Location = {
//   id: string;
//   locationName: string;
//   locationDescription?: string;
//   capacity?: number;
// };
// type AttendanceRecord = {
//   id: string;
//   createdAt: string;
//   sessionId: string;
//   userId: string;
//   user: Usert;
// };
