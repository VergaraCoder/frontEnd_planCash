import { createBrowserRouter } from "react-router";
import { Layout } from "../components/layout/layout";
import { Register } from "../pages/register/Register";
import { Login } from "../pages/login/Login";
import { Home } from "../pages/home/Home";
import { Category } from "../pages/viewCategorie/ViewCategorie";
import { ViewBuy } from "../pages/viewBuy/ViewBuy";
import { ErrorScreen } from "../pages/screenError/error";
import BarChart from "../components/estadistic";
import { PrincipalScreen } from "../pages/main/FirstScreen";


export const Router= createBrowserRouter([
  {
        path: "/pages",
        Component: Layout,
        ErrorBoundary:ErrorScreen,
        children: [
          {
            path:"main", Component:PrincipalScreen
          },
          {path: "register",Component: Register},
          {path: "login",Component: Login},
          {path: "home",Component: Home},
          {
            path: "category", Component:Category
          },
          {
            path:"buy", Component:ViewBuy
          },
         
      ],
      },
]);