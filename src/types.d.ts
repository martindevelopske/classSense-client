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
type usert = {
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
};

type SessionProps = {
  id: string;
  sessionId: string;
  userId: string;
  session: Session;
};
type Location = {
  id: string;
  locationName: string;
  locationDescription?: string;
  capacity?: number;
};
