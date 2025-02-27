import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <h1 className="text-2xl">Hey there 👋</h1>
      <Outlet />
    </div>
  );
}

export default App;
