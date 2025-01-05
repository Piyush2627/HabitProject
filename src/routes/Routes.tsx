import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import LoginPage from "../pages/login";
import AdminLayout from "../layouts/AdminLayout";
import SignUpPage from "../pages/SignUpPage";
import HomeWebsiteLayout from "../layouts/HomeWebsiteLayout";
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeWebsiteLayout />,
  },
  {
    path: "/dashboard",
    element: <MainLayout />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
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
