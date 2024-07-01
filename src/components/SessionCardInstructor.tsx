const SessionCardInstructor = ({ session }: { session: Session }) => {
  return (
    <div className="border h-auto p-2 border-purple text-black rounded-lg  w-full md:w-2/6">
      <h2>{session?.name}</h2>
      <p className={`${session?.status == "live" && "text-green-600"} `}>
        Status: {session?.status}
      </p>
      <p className="border border-gray-300 mt-3"></p>
      <p className="flex items-center gap-2">
        Instructor:{" "}
        <span className="flex gap-2">
          <p>{session?.instructor?.firstname} </p>
          {session?.instructor?.lastname}
        </span>
      </p>
      {/* Add more session details as needed */}
    </div>
  );
};

export default SessionCardInstructor;
