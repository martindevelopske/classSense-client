type User = {
  user:
    | {
        id: number;
        email: string;
      }
    | undefined;
  userType: string | undefined;
};

type Instructor = {
  id: number;
  email: string;
  password: number;
  createdAt: Date;
};
type usert = {
  email: string;
  id: number;
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
