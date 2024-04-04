const SessionCardInstructor = ({ session }) => {
  console.log(session);

  return (
    <div className="border h-auto p-2 bg-purple rounded-lg text-white">
      <h2>{session.name}</h2>
      <p>ID: {session.id}</p>
      <p className={`${session.status == "live" && "text-green-600"} `}>
        Status: {session.status}
      </p>
      <p className="border border-gray-300 mt-3"></p>
      <p>Instructor: {session.instructor_id}</p>
      {/* Add more session details as needed */}
    </div>
  );
};

export default SessionCardInstructor;
