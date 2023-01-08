import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import AdminPage from "./pages/admin/AdminPage";
import LoginPage from "./pages/auth/LoginPage";
import RootLayout from "./pages/layout/RootLayout";
import UserPage from "./pages/user/UserPage";
import UserRole from "./pages/user/UserRole";
  import "react-toastify/dist/ReactToastify.css";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<LoginPage />} />
        <Route path="role" element={<UserRole />} />
        <Route path="admin" element={<AdminPage />} />
        <Route path="user/:id" element={<UserPage />} />
      </Route>
    )
  );
  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;
