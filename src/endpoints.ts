const api = "https://3.83.108.200/api/v1";
export const login = `${api}/auth/login`;
export const logout = `${api}/auth/logout`;

export const signup = `${api}/user`;
export const createInstructor = `${api}/instructors`;

//attendance
export const addAttendance = `${api}/attendance/add`; //pass session id
export const deleteAttendance = `${api}/attendance/delete`;
export const getSessionAttendees = `${api}/attendance/attendees`; //pass session id

//sessions
export const createSession = `${api}/sessions`;
export const getAllSessions = `${api}/sessions`;
export const getSessionMembers = `${api}/sessions/members`;
export const addSessionMembers = `${api}/sessions/members/add`;
export const getUserSessions = `${api}/sessions/user`;
export const getInstructorSessions = `${api}/sessions/instructor`;
export const getSingleSession = `${api}/sessions`;
