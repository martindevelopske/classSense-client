import { Button } from "@/components/ui/button";

function Roles() {
  return (
    <>
      <div className="flex items-center justify-between w-full p-2">
        <div>
          <h2 className="text-purple text-2xl font-bold">All Roles</h2>
        </div>
        <div>
          <Button>Create New Role</Button>
        </div>
      </div>
    </>
  );
}
export default Roles;
