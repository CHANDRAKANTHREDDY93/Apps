import { Provider } from "react-redux";
import { Welcome } from "../welcome/welcome";
import { userStore } from "store/user-store";
import Nav from "~/components/nav/nav";

export function meta({}) {
  return [
    { title: "Shopping Cart App" },
    { name: "description", content: "Welcome to Shopping Cart App!" },
  ];
}

export default function Home() {
  return (
        <Provider store={userStore}>
          <Nav />
        </Provider>
  );
}
