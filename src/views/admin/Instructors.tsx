import { Button } from "@/components/ui/button";

function Instructors() {
  return (
    <>
      <div className="flex items-center justify-between w-full p-2">
        <div>
          <h2 className="text-purple text-2xl font-bold">All Instructors</h2>
        </div>
        <div>
          <Button>Create New Instructor</Button>
        </div>
      </div>
    </>
  );
}
export default Instructors;
