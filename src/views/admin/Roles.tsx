import { Button } from "@/components/ui/button";
import { getAllRoles } from "@/endpoints";
import useFetchData from "@/lib/fetchData";
import { useEffect, useState } from "react";
import FadeLoader from "react-spinners/FadeLoader";

function Roles() {
  const [roles, setRoles] = useState<RoleResponse[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { fetchData } = useFetchData();
  const getRoles = async () => {
    try {
      setLoading(true);
      await fetchData(getAllRoles).then((res) => {
        console.log(res);

        setRoles(res.data.message);
      });
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getRoles();
  }, []);
  let count = 0;
  return (
    <>
      <div className="flex flex-col justify-between w-full p-2">
        <div className="flex items-center justify-between w-full">
          <h2 className="text-purple text-2xl font-bold">All Roles</h2>
          <Button>Create New Role</Button>
        </div>
        <div className="w-full">
          <div className="flex flex-col gap-2 rounded-md h-auto w-full p-2">
            {!loading &&
              roles &&
              roles.length > 0 &&
              roles.map((role) => {
                return (
                  <div
                    key={role.id}
                    className="flex gap-2 flex-col justify-center items-start rounded-lg h-auto w-full"
                  >
                    <div className="flex gap-2 items-center w-full justify-between bg-slate-200  p-2">
                      <h2>{++count}.</h2>
                      <h2>{role.id}</h2>
                      <h2 className="font-bold">{role.roleName}</h2>
                    </div>
                  </div>
                );
              })}
            {loading && <FadeLoader />}
          </div>
        </div>
      </div>
    </>
  );
}
export default Roles;
