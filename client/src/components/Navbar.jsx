import logo from "../img/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../allContexts/userContext";

const Navbar = () => {
  const { currentUser, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const handleClick = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="navbar">
      <div className="container">
        <Link className="link" to="/">
          <div className="logo">
            <img src={logo} alt="" />
            <span>Ayblog</span>
          </div>
        </Link>

        <div className="links">
          <Link className="link" to="/?cat=art">
            <h6>ART</h6>
          </Link>
          <Link className="link" to="/?cat=science">
            <h6>SCIENCE</h6>
          </Link>
          <Link className="link" to="/?cat=technology">
            <h6>TECHNOLOGY</h6>
          </Link>
          <Link className="link" to="/?cat=cinema">
            <h6>CINEMA</h6>
          </Link>
          <Link className="link" to="/?cat=design">
            <h6>DESIGN</h6>
          </Link>
          <Link className="link" to="/?cat=food">
            <h6>FOOD</h6>
          </Link>
          {currentUser === null ? (
            ""
          ) : (
            <Link to={`/profile/${currentUser.id}`} className="link">
              <div className="user">
                <img
                  src="https://images.unsplash.com/photo-1670272499188-79fe22656f64?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxNnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
                  alt=""
                />
                <span>{currentUser?.fName}</span>
              </div>
            </Link>
          )}

          {currentUser ? (
            <span onClick={handleClick} style={{ cursor: "pointer" }}>
              Logout
            </span>
          ) : (
            <Link className="link" to="/login">
              <span>Login</span>
            </Link>
          )}

          <span className="write">
            <Link to="/write" className="link">
              Write
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
