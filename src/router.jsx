import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorPage from "./pages/0.0.ErrorPage";
import HomePage from "./pages/1.0.HomePage";
import Account from "./pages/5.Accounts/0.0.Account";
import GCU from "./pages/0.1.CGU";
import Privacy from "./pages/0.2.Privacy";
import WebDev from "./pages/3.Tutos/1.WebDeveloppement/0.Annexes/0.0.WebDev";
import BuildExpressServer from "./pages/3.Tutos/1.WebDeveloppement/2.JS/3.Express/1.0.BuildExpressServer";
import SetRouter from "./pages/3.Tutos/1.WebDeveloppement/2.JS/4.Routes/SetRouter";
import MongoDB from "./pages/3.Tutos/1.WebDeveloppement/2.JS/5.MongoDB/SetMongoDB";
import Mongoose from "./pages/3.Tutos/1.WebDeveloppement/2.JS/6.Mongoose/Mongoose";
import Tutos from "./pages/3.Tutos/0.0.Tutos";
import OpenPyXl from "./pages/3.Tutos/2.OpenPyXl/1.0.OpenPyXl";


export const router = createBrowserRouter([
    {
        path : "/",
        element : <App />,
        errorElement : <ErrorPage />,
        children : [
        {
            index : true,
            element : <HomePage />
        },
        {
            path : "account",
            element : <Account />
        },
        {
            path : "GCU",
            element : <GCU />
        },
        {
            path : "privacy",
            element : <Privacy />
        },
        {
            path : "Tutos",
            element : <Tutos />
        },
        {
            path : "Tutos/WebDev",
            element : <WebDev />,
        },
        {
            path : "Tutos/OpenPyXl",
            element : <OpenPyXl />,
        },
        {
            path : "Tutos/WebDev/Express",
            element : <BuildExpressServer />
        },
        {
            path : "Tutos/WebDev/Routes",
            element : <SetRouter />
        },
        {
            path : "Tutos/WebDev/MongoDB",
            element : <MongoDB />
        },
        {
            path : "Tutos/WebDev/Mongoose",
            element : <Mongoose />
        }
        ]
    }
]);