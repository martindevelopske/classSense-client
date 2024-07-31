const SessionCard = (sessionData: { sessionData: SessionResponse }) => {
  const currentSession = sessionData.sessionData;
  const instructor = sessionData.sessionData.instructor;
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
        Instructor: {instructor?.firstname} {instructor?.lastname}
      </p>
    </div>
  );
};

export default SessionCard;
