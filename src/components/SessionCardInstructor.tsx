const SessionCardInstructor = ({ session }: { session: Session }) => {
  return (
    <div className="border h-auto p-2 text-white rounded-lg  w-3/4 md:w-2/6 bg-primary">
      <h2>{session?.name}</h2>
      <p className={`${session?.status == "live" && "text-green-600"} `}>
        Status: {session?.status}
      </p>
      <p className="border  mt-3"></p>
      <div className="flex items-center gap-2">
        Instructor:{" "}
        <span className="flex gap-2">
          <p>{session?.instructor?.firstname} </p>
          {session?.instructor?.lastname}
        </span>
      </div>
      {/* Add more session details as needed */}
    </div>
  );
};

export default SessionCardInstructor;
