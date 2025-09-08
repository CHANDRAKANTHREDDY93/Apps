import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { Welcome } from "./welcome/welcome";
import Login from "./components/auth/login";
import Signup from "./components/auth/signup";
import Nav from "./components/nav/nav";
import { Provider } from "react-redux";
import { userStore } from "store/user-store";
import Home from "./components/home/home";

export function App() {
    return (
        <>
            <Provider store={userStore}>
                <BrowserRouter>
                    <Routes>
                        {/* Root route */}
                        <Route path="/" element={<Nav />}>
                            <Route index element={<Home />} />
                             <Route path="home" element={<Home />} /> 
                        </Route>

                        {/* Auth routes */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />

                        {/* App layout with nested routes */}
                        <Route path="/app/*" element={<Nav />}>
                            <Route path="home" element={<Home />} />
                            {/* Add more nested routes here */}
                        </Route>

                        {/* Redirects */}
                        <Route path="/app" element={<Navigate to="/app/home" replace />} />
                        <Route path="*" element={<Navigate to="/app/home" replace />} />
                    </Routes>
                </BrowserRouter>
            </Provider>

        </>
    );
}