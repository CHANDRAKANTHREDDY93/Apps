import { Provider } from "react-redux";
import { Welcome } from "../welcome/welcome";
import { userStore } from "store/user-store";

export function meta({}) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
        <Provider store={userStore}>
          <Welcome />
        </Provider>
  );
}
