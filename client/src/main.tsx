import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import App from "./App.tsx";
import { SocketProvider } from "./context/ContextProvider.tsx";
import HomeScreen from "./screens/HomeScreen.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomeScreen />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <>
    <SocketProvider>
      <RouterProvider router={router} />
    </SocketProvider>
  </>
);
