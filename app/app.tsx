import { Route, Routes } from "react-router";
import { Welcome } from "./welcome/welcome";
import Login from "./components/auth/login";
import Signup from "./components/auth/signup";
import Nav from "./components/nav/nav";
import { Provider } from "react-redux";
import { userStore } from "store/user-store";

export function App() {
    return (
    <>
        <Routes>
            <Route path={''} element={<Nav />}></Route>
             <Route path={'**'} element={<Nav />}></Route>
            <Route path='/login' element={
                <Provider store={userStore}>
                    <Login />
                    </Provider>
                }></Route>
            <Route path='/signup' element={<Signup />}></Route>
            <Route path='/app' element={<Nav />}></Route>
        </Routes>
    </>
);
}