import { useContext, useEffect, useState } from "react";
import { UserContext } from "../allContexts/userContext";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const Profile = () => {
  const { currentUser } = useContext(UserContext);
  const [posts, setPosts] = useState([]);

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  const id = useParams().id;
  console.log(id);

  const fetchData = async () => {
    try {
      const res = await axios.get(`/posts/?id=${id}`);
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <div className="profile">
      <div className="left">
        <div className="userInfo">
          <img
            src="https://images.unsplash.com/photo-1670272499188-79fe22656f64?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxNnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
            alt=""
          />
          <h2>
            {currentUser.fName} <span>{currentUser.lName}</span>
          </h2>
          <h3>{currentUser.username}</h3>
          <p>This is who I am</p>
          <button>Edit profile</button>
          <p className="follow">
            <span>
              <PeopleOutlineOutlinedIcon /> 500 followers
            </span>{" "}
            · 20 following
          </p>
          <div className="bottom">
            <div className="item">
              <span>
                <LocationOnOutlinedIcon /> Nigeria
              </span>
            </div>
            <div className="item">
              <span>
                <EmailOutlinedIcon /> {currentUser.email}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="right">
        <div className="posts">
          {posts.map((post) => {
            return (
              <div className="post" key={post.id}>
                <div className="postContainer">
                  <img
                    src="https://images.unsplash.com/photo-1670272499188-79fe22656f64?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxNnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
                    alt=""
                  />
                  <p>{truncate(post.desc, 65)}</p>
                  <button>Read More</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Profile;
