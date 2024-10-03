import { NavLink } from "react-router-dom";

export default function Header() {
    return (
        <nav className="flex w-full items-center justify-center gap-10 bg-gray-100">
            <NavLink
                to="/"
                className={({ isActive }) =>
                    isActive ? "text-brand-main underline" : "text-gray-700"
                }
            >
                Home
            </NavLink>
            <NavLink
                to="/history"
                className={({ isActive }) =>
                    isActive ? "text-brand-main underline" : "text-gray-700"
                }
            >
                History
            </NavLink>
            {/* <NavLink
        to="/share"
        className={({ isActive }) =>
          isActive ? "text-blue-500 underline" : "text-gray-700"
        }
      >
        Share
      </NavLink> */}
        </nav>
    );
}
