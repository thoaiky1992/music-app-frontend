import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { SocketIOContextProvider } from "./context/socket-io.context";
import { fetchUserAction } from "./store/actions/user.actions";
import store from "./store/configStore";

Promise.all([
  // fetch current user and update the store before mounting into root
  store.dispatch(fetchUserAction() as any),
]).finally(() => {
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <Provider store={store}>
      <SocketIOContextProvider>
        <App />
      </SocketIOContextProvider>
    </Provider>
  );
});
