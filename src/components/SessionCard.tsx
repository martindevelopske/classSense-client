type NoInstructor = Omit<SessionProps, "instructor">;
const SessionCard = ({ sessionData }: { sessionData: NoInstructor }) => {
  console.log(sessionData);
  const currentSession = sessionData?.session;
  const session = sessionData.session;

  return (
    <div className="border h-auto p-2 bg-primary text-white rounded-lg  w-full md:w-2/6">
      <h2>{currentSession.name}</h2>
      {/* <p>ID: {currentSession.id}</p> */}
      <p className={`${currentSession.status == "live" && "text-green-600"} `}>
        Status: {currentSession.status}
      </p>
      <p>Day: {currentSession.day}</p>
      <p className="border border-gray-300 mt-3"></p>
      <p>
        Instructor: {session.instructor?.firstname}{" "}
        {session.instructor?.lastname}
      </p>
    </div>
  );
};

export default SessionCard;
