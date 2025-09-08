import { NavLink, Outlet, useNavigate } from "react-router";

import { NavLinks } from "./nav-link";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { loggedOut } from "store/reducer/user-reducer";
import ChatBot from "../chat-bot/chat-bot";
import logoUrl from '../../../assets/logo.jpg';
import Alert from "../alert/alert";

export default function Nav() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loggedIn, setLoggedIn] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const isLoggedIn = useSelector((state) => state.reducer)?.isLoggedIn;
    const cartSelector = useSelector((item: any) => item.cartReducer)?.carts;

    useEffect(() => {
        setLoggedIn(isLoggedIn);
    }, [isLoggedIn]);

    const handleLogin = () => {
        navigate("/login");
    };
    const handleLogOut = () => {
        dispatch(loggedOut());
        navigate("/login");
    }

    return (
        <>
            <div className="max-w-screen-xl mx-auto">
                <nav className="flex flex-wrap justify-between w-full flex-row bg-gray-800 text-white gap-4">
                    <div className="w-full">
                        <div className="flex justify-between">
                            <img src={logoUrl} alt="My Shopping Cart" className="h-18 w-[96px] px-1 object-cover top-0 left-0 z-0"></img>
                            {!loggedIn ? (
                                <button className="cursor-pointer border-2 border-gray-700 m-2 w-[150px]" onClick={handleLogin}>
                                    Login / Sign Up
                                </button>
                            ) : (
                                <>
                                    <button
                                        onClick={toggleDropdown}
                                        className="flex items-center justify-center h-8 w-[50px] rounded-md 
                                border border-gray-300 shadow-sm mt-4 mx-2 bg-white 
                                text-sm font-medium text-gray-700">
                                        <i className="fa fa-user-circle fa-2x"></i>
                                    </button>
                                    {isOpen && (
                                        <div
                                            className="origin-bottom-right absolute right-0 mt-[50px] w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                            role="menu"
                                        >
                                            <div className="py-1" role="none">
                                                <a
                                                    href="#"
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    role="menuitem"
                                                >
                                                    Account settings
                                                </a>
                                                <a
                                                    href="#"
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    role="menuitem"
                                                >
                                                    Support
                                                </a>
                                                <a
                                                    href="#"
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    role="menuitem"
                                                >
                                                    License
                                                </a>
                                                <a
                                                    onClick={handleLogOut}
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    role="menuitem"
                                                >
                                                    Logout
                                                </a>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                        <ul className="flex flex-wrap justify-between p-2">
                            {NavLinks.map(({ id, href, text, className, icon }) => (
                                <li key={id} className={className}>
                                    <NavLink to={href} className="flex items-center">
                                        <i className={`text-sm ${icon}`}></i>
                                        {text === 'Cart' && cartSelector.length > 0 ?
                                            <span className="bg-red-500 text-white text-xs sm:text-sm font-bold px-2 py-0.5 rounded-full">
                                                {cartSelector?.length}
                                            </span> : <span>{text}</span>
                                        }
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                </nav>

            </div>
            <Alert />

            <Outlet />
            <footer className="bg-gray-800 text-white text-center p-4 mt-4 max-w-screen-xl mx-auto">
                &copy; {new Date().getFullYear()} My Shopping Cart. All rights reserved.
                <ChatBot />
            </footer>
        </>
    );
}