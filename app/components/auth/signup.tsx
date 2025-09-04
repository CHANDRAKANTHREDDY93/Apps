import { useState } from "react";
import { useNavigate } from "react-router";


export default function SignUp() {

    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const signup = async (event: Event) => {
        event.preventDefault();
        if (password !== confirmPassword) {}
        else {
        await fetch("/api/signup", {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({email: email, password: password, confirmPassword: confirmPassword, firstName: firstName, lastName: lastName})
        }).then((res) => {
            if (res.status === 201) {
                navigate("/app/home", { replace: true });
            }
        });
        }
        
    };

    return (
        <form onSubmit={(event) => signup(event)} className="space-y-6">
            <div className="h-[100vh] items-center flex justify-center px-5 lg:px-0">
                <div className="max-w-screen-xl bg-white border shadow sm:rounded-lg flex justify-center flex-1">
                    <div className="flex-1 bg-blue-900 text-center hidden md:flex">
                        <div
                            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                            style={{
                                backgroundImage: `url(https://www.tailwindtap.com/assets/common/marketing.svg)`,
                            }}
                        ></div>
                    </div>
                    <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                        <div className=" flex flex-col items-center">
                            <div className="text-center">
                                <h1 className="text-2xl xl:text-4xl font-extrabold text-blue-900">
                                    Sign up
                                </h1>
                            </div>
                            <div className="w-full flex-1 mt-8">
                                <div className="mx-auto max-w-xs flex flex-col gap-4">
                                    <input
                                        className="w-full px-5 py-3 text-gray-800 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        type="text"
                                        name="firstName"
                                        placeholder="Enter your first name"
                                        onChange={(element) => setFirstName(element.target.value)}
                                    />
                                    <input
                                        className="w-full px-5 py-3 text-gray-800 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        type="text"
                                        name="lastName"
                                        placeholder="Enter your last name"
                                        onChange={(element) => setLastName(element.target.value)}
                                    />
                                    <input
                                        className="w-full px-5 py-3 text-gray-800 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        onChange={(element) => setEmail(element.target.value)}
                                    />
                                    <input
                                        className="w-full px-5 py-3 text-gray-800 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        onChange={(element) => setPassword(element.target.value)}
                                    />
                                    <input
                                        className="w-full px-5 py-3 text-gray-800 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Confirm Password"
                                        onChange={(element) => setConfirmPassword(element.target.value)}
                                    />
                                    <button
                                        className="mt-5 tracking-wide font-semibold bg-blue-900 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                        type="submit">
                                        <svg
                                            className="w-6 h-6 -ml-2"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            strokeLinecap="round"
                                            stroke-linejoin="round"
                                        >
                                            <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                            <circle cx="8.5" cy="7" r="4" />
                                            <path d="M20 8v6M23 11h-6" />
                                        </svg>
                                        <span className="ml-3">Sign Up</span>
                                    </button>
                                    <p className="mt-6 text-xs text-gray-600 text-center">
                                        Already have an account?{" "}
                                        <a href="/login">
                                            <span className="text-blue-900 font-semibold">Sign in</span>
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>

    );
};