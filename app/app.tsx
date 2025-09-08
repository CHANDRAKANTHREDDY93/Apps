import { Route, Routes } from "react-router";
import { Welcome } from "./welcome/welcome";
import Login from "./components/auth/login";
import Signup from "./components/auth/signup";
import Nav from "./components/nav/nav";
import { Provider } from "react-redux";
import { userStore } from "store/user-store";
import Home from "./routes/home";

export function App() {
    return (
    <>
           <Provider store={userStore}>
            <Routes>
                <Route path="/" element={<Nav />}>
                    <Route index element={<Home />} /> {/* Default home under Nav */}
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/app/*" element={<Nav />}>
                    <Route path="home" element={<Home />} /> {/* Products/Home page */}
                    {/* Add other child routes here */}
                </Route>
                <Route path="*" element={<Nav />} />
            </Routes>
        </Provider>
    </>
);
}