import exp from "constants";
import "./Header.css";
import { NavLink } from "react-router-dom";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";

function Header(): JSX.Element {
    return (
        <div className="Header">
            <AuthMenu />

            <h1>NorthWind Traders</h1>

        </div>

    )
}

export default Header;