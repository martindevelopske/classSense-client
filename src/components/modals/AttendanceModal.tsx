import FadeLoader from "react-spinners/FadeLoader";
import { PiSealCheckFill } from "react-icons/pi";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import ErrorComponent from "../Error";
type props = {
  loading: boolean;
  error?: string | null | undefined;
  success?: boolean;
};
function AttendanceModal({ loading, error, success }: props) {
  return (
    <div className="h-full w-full bg-modalbg bg-opacity-90 fixed top-0 right-0 flex items-center justify-center z-50">
      <div className="bg-white w-4/5 rounded-md h-3/4 flex flex-col items-center justify-around gap-2 p-3">
        {loading && <FadeLoader color="#36d7b7" />}
        {loading && <p>loading....</p>}
        {error && (
          <div>
            <ErrorComponent errorMessage={error} />
          </div>
        )}
        {success && !loading ? (
          <div className="flex flex-col items-center gap-3 justify-center p-2">
            <PiSealCheckFill size={150} color="green" />
            <div className="text-lg">You're signed in! Welcome to class</div>
          </div>
        ) : (
          ""
        )}

        <Link to="/student">
          <Button>Close</Button>
        </Link>
      </div>
    </div>
  );
}

export default AttendanceModal;
