import { Link } from "react-router-dom";
import './index.css'
export default function Navbar(){
    return(
    <div className="navbar">
    <Link to="/login" className="link">
      login
    </Link>
    <Link to="/register" className="link">
      register
    </Link>
    
  </div>
    )
}
