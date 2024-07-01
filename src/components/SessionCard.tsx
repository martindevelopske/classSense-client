type props = { session: SessionProps };
const SessionCard = (sessionData: props) => {
  const currentSession = sessionData.session.session;

  return (
    <div className="border h-auto p-2 bg-primary text-white rounded-lg  w-3/4 md:w-2/6">
      <h2>{currentSession.name}</h2>
      <p>ID: {currentSession.id}</p>
      <p className={`${currentSession.status == "live" && "text-green-600"} `}>
        Status: {currentSession.status}
      </p>
      <p className="border border-gray-300 mt-3"></p>
      <p>Instructor: {currentSession.instructor.email}</p>
      {/* Add more session details as needed */}
    </div>
  );
};

export default SessionCard;
