import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import LoginPage from "../pages/login";
const router = createBrowserRouter([
  {
    path: "/home",
    element: <MainLayout />,
  },
  {
    path: "/",
    element: <LoginPage />,
  },
]);
function Routes() {
  return <RouterProvider router={router} />;
}
export default Routes;
