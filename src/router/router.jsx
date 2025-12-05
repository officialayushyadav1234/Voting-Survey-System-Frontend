import {createBrowserRouter} from "react-router-dom"
import Layout from "../pages/Layout"
import Home from '../pages/Home'
import Signup from "../pages/Signup"
import Login from "../pages/Login"
import Profile from "../pages/Profile"
import UserPrivate from "./UserPrivate"
import AdminDashboard from "../pages/AdminDashboard"


export let router = createBrowserRouter([
    {
        path:"/",
        element:<Layout/>,
        children:[
            {
                index:true,
                element:<Home/>,
            },
            {
                path:"/register",
                element:<Signup/>
            },
            {
                path:"/login",
                element:<Login/>
            },
            {
                path:"/profile",
                element:(
                    <UserPrivate>
                        <Profile/>
                    </UserPrivate>
                )
            },
            {
                path:"/adminDashbord",
                element:<AdminDashboard/>
            }
        ]

    }
])