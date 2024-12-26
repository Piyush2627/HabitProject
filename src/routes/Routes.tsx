import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import LoginPage from "../pages/login";
import AdminLayout from "../layouts/AdminLayout";
const router = createBrowserRouter([
  {
    path: "/home",
    element: <MainLayout />,
  },
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
  },
]);
function Routes() {
  return <RouterProvider router={router} />;
}
export default Routes;
