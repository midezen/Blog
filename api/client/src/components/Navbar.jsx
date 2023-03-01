import React from "react";
import logo from "../img/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../allContexts/userContext";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import avatar from "../img/avatar.jpg";

const Navbar = () => {
  const { currentUser, logout } = useContext(UserContext);

  const location = useLocation().search.split("=")[1];

  const navigate = useNavigate();
  const handleClick = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const [state, setState] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };

  return (
    <div className="navbar">
      <div></div>
      <div className="container">
        <div className="thisDiv">
          <div className="span">
            {["left"].map((anchor) => (
              <React.Fragment key={anchor}>
                <MenuIcon
                  onClick={toggleDrawer(anchor, true)}
                  style={{ fontSize: "35px" }}
                />

                <Drawer
                  anchor={anchor}
                  open={state[anchor]}
                  onClose={toggleDrawer(anchor, false)}
                >
                  <div
                    className="mobileLinks"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      fontSize: "30px",
                      // gap: "30px",
                      padding: "20px",
                      textAlign: "justify",
                    }}
                  >
                    <Link
                      style={{
                        textDecoration: "none",
                        color: "rgb(9, 228, 228)",
                      }}
                      to="/?cat=art"
                    >
                      <h6
                        className={location === "art" && "active"}
                        style={{ padding: "10px" }}
                      >
                        ART
                      </h6>
                    </Link>
                    <hr />
                    <Link
                      style={{
                        textDecoration: "none",
                        color: "rgb(9, 228, 228)",
                      }}
                      to="/?cat=science"
                    >
                      <h6
                        className={location === "science" && "active"}
                        style={{ padding: "10px" }}
                      >
                        SCIENCE
                      </h6>
                    </Link>
                    <hr />
                    <Link
                      style={{
                        textDecoration: "none",
                        color: "rgb(9, 228, 228)",
                      }}
                      to="/?cat=technology"
                    >
                      <h6
                        className={location === "technology" && "active"}
                        style={{ padding: "10px" }}
                      >
                        TECHNOLOGY
                      </h6>
                    </Link>
                    <hr />
                    <Link
                      style={{
                        textDecoration: "none",
                        color: "rgb(9, 228, 228)",
                      }}
                      to="/?cat=cinema"
                    >
                      <h6
                        className={location === "cinema" && "active"}
                        style={{ padding: "10px" }}
                      >
                        CINEMA
                      </h6>
                    </Link>
                    <hr />
                    <Link
                      style={{
                        textDecoration: "none",
                        color: "rgb(9, 228, 228)",
                      }}
                      to="/?cat=design"
                    >
                      <h6
                        className={location === "design" && "active"}
                        style={{ padding: "10px" }}
                      >
                        DESIGN
                      </h6>
                    </Link>
                    <hr />
                    <Link
                      style={{
                        textDecoration: "none",
                        color: "rgb(9, 228, 228)",
                      }}
                      to="/?cat=food"
                    >
                      <h6
                        className={location === "food" && "active"}
                        style={{
                          padding: "10px",
                        }}
                      >
                        FOOD
                      </h6>
                    </Link>
                    <hr />
                    <span style={{ padding: "10px", fontSize: "24px" }}>
                      <Link
                        to={currentUser === null ? "/login" : "/write"}
                        style={{
                          textDecoration: "none",
                          color: "rgb(9, 228, 228)",
                        }}
                      >
                        Write
                      </Link>
                    </span>
                    <hr />
                  </div>
                </Drawer>
              </React.Fragment>
            ))}
          </div>
          <Link className="link" to="/">
            <div className="logo">
              <img src={logo} alt="" />
              <span>Ayblog</span>
            </div>
          </Link>
        </div>

        <div className="links">
          <div className="left">
            <Link className="link" to="/?cat=art">
              <h6 className={location === "art" && "active"}>ART</h6>
            </Link>
            <Link className="link" to="/?cat=science">
              <h6 className={location === "science" && "active"}>SCIENCE</h6>
            </Link>
            <Link className="link" to="/?cat=technology">
              <h6 className={location === "technology" && "active"}>
                TECHNOLOGY
              </h6>
            </Link>
            <Link className="link" to="/?cat=cinema">
              <h6 className={location === "cinema" && "active"}>CINEMA</h6>
            </Link>
            <Link className="link" to="/?cat=design">
              <h6 className={location === "design" && "active"}>DESIGN</h6>
            </Link>
            <Link className="link" to="/?cat=food">
              <h6 className={location === "food" && "active"}>FOOD</h6>
            </Link>
          </div>
          {currentUser === null ? (
            ""
          ) : (
            <Link to={`/profile/${currentUser.id}`} className="link">
              <div className="user">
                <img
                  src={
                    currentUser.img === null
                      ? avatar
                      : process.env.PUBLIC_URL +
                        `/profilePic/${currentUser.img}`
                  }
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
            <Link
              to={currentUser === null ? "/login" : "/write"}
              className="link"
            >
              Write
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
