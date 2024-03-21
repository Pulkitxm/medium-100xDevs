import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./state/store.tsx";
import { CookiesProvider } from "react-cookie";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <CookiesProvider defaultSetOptions={{ path: "/" }}>
      <App />
    </CookiesProvider>
  </Provider>
);