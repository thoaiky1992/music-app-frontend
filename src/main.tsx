import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { SocketIOContextProvider } from "./context/socket-io.context";
import store from "./store/configStore";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <SocketIOContextProvider>
      <App />
    </SocketIOContextProvider>
  </Provider>
);
