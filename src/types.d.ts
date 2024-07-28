type User = {
  user:
    | {
        id: string;
        firstname: string;
        lastname: string;
        email: string;
      }
    | undefined;
  userType: string | undefined;
};

type StoreState = {
  user: User | null;
  setUser: (userObj: User | null) => void;
};

type Instructor = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: number;
  createdAt: Date;
};
type InstructorT = {
  id: string;
  firstname?: string;
  lastname?: string;
  email: string;
};
type Usert = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
};
type Session = {
  id: string;
  name: string;
  instructorId: string;
  status: string;
  day: string;
  locationId: string;
  createdAt: Date;
  instructor?: InstructorT;
};

type SessionProps = {
  id: string;
  sessionId: string;
  userId: string;
  session: Session;
  instructor: InstructorT;
};
type LocationProps = {
  id: string;
  locationName: string;
  locationDescription?: string;
  capacity?: number;
};
type AttendanceRecord = {
  id: string;
  createdAt: string;
  sessionId: string;
  userId: string;
  user: Usert;
};

interface SessionCard {
  id: string;
  name: string;
  status: string;
  day: string;
  createdAt: string;
  instructor: InstructorT;
  instructorId: string;
  location: LocationProps;
  locationId: string;
  sessionTime: Date | null;
}
interface SingleSession extends SessionCard {
  members: Usert[];
  attendance: AttendanceRecord[];
}

type SessionMembers = {
  id: string;
  sessionId: string;
  userId: string;
  session?: Session;
  user: Usert;
};
