import { Button } from "@/components/ui/button";

function Rooms() {
  return (
    <>
      <div className="flex items-center justify-between w-full p-2">
        <div>
          <h2 className="text-purple text-2xl font-bold">All Rooms</h2>
        </div>
        <div>
          <Button>Create New Room</Button>
        </div>
      </div>
    </>
  );
}
export default Rooms;
