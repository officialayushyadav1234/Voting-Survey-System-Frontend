import { Outlet } from "react-router-dom"
import {Toaster} from "react-hot-toast"
import NavBar from "../component/navbar/NavBar"
import Footer from "../component/footer/Footer"

function Layout() {
    return (
        <div>
            <NavBar />  {/* Navbar at the top */}
            <Outlet />   {/* This will render the current page */}
            <Toaster />  {/* Toast notifications */}
            <Footer />   {/* Footer at the bottom of every page */}
        </div>
    )
}

export default Layout