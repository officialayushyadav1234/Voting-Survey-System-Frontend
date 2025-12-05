import { Link } from "react-router-dom" 
import style from "./navbar.module.css";
import { Fragment } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function NavBar() {

    let voterId = sessionStorage.getItem("voterId");
    const id = sessionStorage.getItem("id");

    let navigate = useNavigate();

    let logout = ()=>{
        if (id){
            sessionStorage.removeItem("id");
            toast.success("Logout");
            navigate("/");
        } else{
            sessionStorage.removeItem("voterId");
            toast.success("Logout");
            navigate("/");
        }
    }

    return (
        <>
            <nav id={style.nav}>
            <figure>
                <img src="/logo.png" alt="logo voting survey" title="voting survey"/>
            </figure>
            <h1 className={style.title}>Voting Survey</h1>

            <ul>
                <li><Link to="/">Home</Link></li>
                {id || voterId ? (
                    <Fragment>
                        <li className="g-btn"><Link to={id ? "/adminDashbord":"/profile"} >profile</Link></li>
                        <li className="g-btn" onClick={logout}>LogOut</li>
                    </Fragment>
                ) : (
                    <Fragment>
                        <Link to="/login" ><li className="g-btn">Login</li></Link>
                        <Link to="/register"><li className="g-btn">Signup</li></Link>
                    </Fragment>
                )}
            </ul>


        </nav>
        </>
    )
}

export default NavBar