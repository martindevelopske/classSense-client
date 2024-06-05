import { Link } from "react-router-dom";

type sidebarProps = { role: string | undefined; expanded: boolean };

const Sidebar = ({ role, expanded }: sidebarProps) => {
  const currentRole = role;

  // Define links based on the user's role
  const links =
    currentRole === "student"
      ? [
          { label: "Home", to: "/" },
          { label: "Profile", to: "/profile" },
        ]
      : currentRole === "instructor"
      ? [
          { label: "Home", to: "/" },
          { label: "Dashboard", to: "/dashboard" },
        ]
      : currentRole === "admin"
      ? [
          { label: "Home", to: "/" },
          { label: "Dashboard", to: "/dashboard" },
        ]
      : !currentRole
      ? [{ label: "Login", to: "/" }]
      : []; // default value if currentRole doesn't match any condition

  return (
    <div className="min-h-[500px] w-full text-white">
      <ul
        className={`flex flex-col gap-4 w-full items-center h-full ${
          !expanded && "hidden border border-red-400"
        }`}
      >
        {links?.map((link, index) => (
          <Link
            className="p-2 rounded-sm w-full bg-violet-800"
            to={link.to}
            key={index}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
