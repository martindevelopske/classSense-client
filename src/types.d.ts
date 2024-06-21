type User = {
  user:
    | {
        id: number;
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
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: number;
  createdAt: Date;
};
type usert = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
};
type Session = {
  id: number;
  name: string;
  instructor: Instructor;
  location: Location;
  status: string;
  createdAt: Date;
};

type SessionProps = {
  id: number;
  sessionId: number;
  userId: number;
  session: Session;
};
