const api = "http://localhost:8000";
export const login = `${api}/login`;
export const logout = `${api}/logout`;

export const signup = `${api}/users`;
export const createInstructor = `${api}/instructors`;

//attendance
export const addAttendance = `${api}/attendance/add`; //pass session id
export const deleteAttendance = `${api}/attendance/delete`;
export const getSessionAttendees = `${api}/attendance/attendees`; //pass session id

//sessions
export const createSession = `${api}/sessions`;
export const getAllSessions = `${api}/sessions`;
export const getSessionMembers = `${api}/sessions/members`;
export const addSessionMembers = `${api}/sessions/members`;
export const getUserSessions = `${api}/sessions/userSessions`;
export const getInstructorSessions = `${api}/sessions/instructorSessions`;
export const getSingleSession = `${api}/sessions`;
