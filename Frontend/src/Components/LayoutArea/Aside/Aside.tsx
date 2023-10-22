import { NavLink } from "react-router-dom";
import "./Aside.css";
import TotalProducts from "../../ProductsArea/TotalProducts/TotalProducts";
import { useEffect, useState } from "react";
import { authStore } from "../../../Redux/AuthState";

function Aside(): JSX.Element {

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    useEffect(()=>{
        setIsLoggedIn(authStore.getState().token !== null);
        const unsubscribe = authStore.subscribe(()=>{
            setIsLoggedIn(authStore.getState().token !== null);
        });
        return ()=> unsubscribe();

    },[]);

    return (
        <div className="Aside">


            <NavLink to="/home">Home</NavLink>
            <NavLink to="/products">Products</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/employees">Employees</NavLink>


            {isLoggedIn && <NavLink to="/categories">Categories</NavLink>}

            <NavLink to="/contact-us">Contact Us</NavLink>



            <TotalProducts />

            
        </div>
    );
}

export default Aside;
