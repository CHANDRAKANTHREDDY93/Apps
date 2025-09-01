import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx", ),
    route("/login", "./components/auth/login.tsx"),
    route("/signup", "./components/auth/signup.tsx"),
    route("/app", "./components/nav/nav.tsx", [
        {"path": "/app/home", "file": "./components/home/home.tsx"},
        {"path": "/app/cart", "file": "./components/cart/cart.tsx"},
        {"path": "/app/categories", "file": "./components/categories/categories.tsx"}
    ])
 ] satisfies RouteConfig;
