import {createBrowserRouter} from "react-router-dom";
import Home from "./views/Home";
import Coupon from "./views/Coupon";
import NotFound from "./views/NotFound";
import DefaultLayout from "./components/DefaultLayout";
import Create from "./views/Create";
import Login from "./views/Login";
import Signup from "./views/Signup";
import GuestLayout from "./components/GuestLayout";

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/vrc/:id',
                element: <Coupon />
            },
            {
                path: '/vrc/create',
                element: <Create />
            },
            {
                path: '/vrc/undefined',
                element: <NotFound />
            }
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
            },
        ]
    },
    {
        path: '*',
        element: <NotFound />
    }
]);

export default router;