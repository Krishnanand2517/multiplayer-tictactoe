import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { SocketProvider } from "./context/ContextProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <>
    <SocketProvider>
      <App />
    </SocketProvider>
  </>
);
