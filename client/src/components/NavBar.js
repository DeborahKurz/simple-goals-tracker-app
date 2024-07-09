import { NavLink } from "react-router-dom";

function NavBar(){
    return(
        <>
            <nav>
                <NavLink
                    to="/"
                    style={{ color: "black", textDecoration: "none", padding: "15px 25px", marginRight: "15", background: "#BEBEBE",}}
                >  Home  </NavLink>
                <NavLink
                    to="/goals"
                    style={{ color: "black", textDecoration: "none",padding: "15px 25px", marginRight: "15", background: "#BEBEBE",}}
                >  Goals View  </NavLink>
                <NavLink
                    to="/team"
                    style={{ color: "black", textDecoration: "none",padding: "15px 25px", marginRight: "15", background: "#BEBEBE",}}
                >  Team View  </NavLink>
            </nav>
        </>
    )
}

export default NavBar