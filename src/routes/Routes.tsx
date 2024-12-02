import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./MainLayout";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
  },
]);
function Routes() {
  return <RouterProvider router={router} />;
}
export default Routes;