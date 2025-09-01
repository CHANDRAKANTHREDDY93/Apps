import { NavLink, Outlet } from "react-router";

import { NavLinks } from "./nav-link";

export default function Nav() {
    return (
        <>
        <div className="flex">
        <nav className="flex flex-wrap justify-between w-full flex-row bg-gray-800 text-white gap-4">
            <div className="w-full">
                <ul className="flex flex-wrap justify-between p-2">
                    {NavLinks.map(({ id, href, text, className, icon }) => (
                        <li key={id} className={className}>
                            <NavLink to={href} className="flex items-center">
                                <i className={icon}></i>
                                {text}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
        </div>
        
      <Outlet />
        </>
    );
}