import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { EditUser } from "./pages/EditUser";
import { Register } from "./pages/Register";
import { AddUser } from "./pages/AddUser";

const App = () => {
  return (
    <div className="bg-slate-800 w-full min-h-screen h-full">
      <BrowserRouter>
        <Routes>
          <Route element={<Login />} path="/login" />
          <Route element={<Register />} path="/register" />
          <Route element={<Dashboard />} path="/" />
          <Route element={<EditUser />} path="/edit/:_id" />
          <Route element={<AddUser />} path="/add-user" />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
