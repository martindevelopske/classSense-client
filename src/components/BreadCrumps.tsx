import { CaretRightIcon } from "@radix-ui/react-icons";
import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  const { pathname } = useLocation();
  const pathSegments = pathname.split("/").filter((segment) => segment !== "");

  return (
    <nav aria-label="w-full">
      <ol className="breadcrumb flex items-center gap-2 w-full py-3 text-purple">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <span>
          <CaretRightIcon />
        </span>
        {pathSegments.map((segment, index) => (
          <div className="flex items-center justify-center">
            <li key={index} className="breadcrumb-item">
              <Link to={`/${pathSegments.slice(0, index + 1).join("/")}`}>
                {segment}
              </Link>
            </li>
            <span>
              <CaretRightIcon />
            </span>
          </div>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
