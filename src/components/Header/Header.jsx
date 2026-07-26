import {Link, useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import {useWatchLater} from "../../context/WatchLaterContext";
import "./index.css";

export default function Header() {
    const navigate = useNavigate();
    const { watchLater } = useWatchLater();

    const handleLogout = () => {
        Cookies.remove("jwt_token");
        navigate("/login");
    };

    return (
        <header  className="header">
            <div className="header__container container">
                <Link to="/" className="header__logo">
                   NXTFLIX
                </Link>

                <nav className="header__nav">
                    <Link to="/" className="header__link">
                       Home
                    </Link>
                    <Link to="/watch-later" className="header__link">
                      Watch Later
                      {watchLater.length>0 && (
                        <span className="header__badge">{watchLater.length}</span>
                      )}
                    </Link>
                    <button className="header__logout" onClick={handleLogout}>
                        Logout
                    </button>
                </nav>
            </div>
        </header>
    );
}