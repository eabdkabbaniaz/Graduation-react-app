import { NavLink } from "react-router-dom";

export default function Element({ name, icon, icon2 }) {
  return (
    <ul className={`${name === "Dashboard" ? "mt-6" : ""}`}>
      <NavLink to={`/${name.toLowerCase()}`}>
        {({ isActive }) => (
          <li className="relative px-6 py-3">
            {isActive && (
              <span
                className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                aria-hidden="true"
              ></span>
            )}

            <div
              className={`inline-flex items-center w-full text-sm font-semibold transition-colors duration-150
                ${isActive
                  ? "text-gray-800 dark:text-gray-100"
                  : "hover:text-gray-800 dark:hover:text-gray-200 text-gray-500 dark:text-gray-400"}`}
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d={icon}></path>
                {icon2 && <path d={icon2}></path>}
              </svg>
              <span className="ml-4">{name}</span>
            </div>
          </li>
        )}
      </NavLink>
    </ul>
  );
}