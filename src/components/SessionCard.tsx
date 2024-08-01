const SessionCard = ({ session }: { session: SessionResponse }) => {
  console.log("session", session);
  return (
    <div className="border h-auto p-2 bg-primary text-white rounded-lg  w-full md:w-2/6">
      <h2>{session.name}</h2>
      {/* <p>ID: {currentSession.id}</p> */}
      <p className={`${session.status == "live" && "text-green-600"} `}>
        Status: {session.status}
      </p>
      <p>Day: {session.day}</p>
      <p className="border border-gray-300 mt-3"></p>
      <p>
        Instructor: {session.instructor?.firstname}{" "}
        {session.instructor?.lastname}
      </p>
    </div>
  );
};

export default SessionCard;
