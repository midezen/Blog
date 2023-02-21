import { useContext, useEffect, useState } from "react";
import { UserContext } from "../allContexts/userContext";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";
import avatar from "../img/avatar.jpg";

const Profile = () => {
  const { currentUser } = useContext(UserContext);
  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);
  const [file, setFile] = useState(null);
  const [edit, setEdit] = useState(
    JSON.parse(localStorage.getItem("edit")) || false
  );
  const [updatedUser, setUpdatedUser] = useState({
    firstName: currentUser.fName,
    lastName: currentUser.lName,
    username: currentUser.username,
    userLocation: currentUser.location,
    email: currentUser.email,
    about: currentUser.about,
  });

  const id = useParams().id;

  const fetchData = async () => {
    try {
      const res = await axios.get(`/posts/?id=${id}`);
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchUserData = async () => {
    try {
      const res = await axios.get(`/users/?id=${id}`);
      setUser(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  useEffect(() => {
    fetchUserData();
  }, [id]);

  const handleChange = (e) => {
    setUpdatedUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleToggle = () => {
    setEdit(!edit);
  };

  useEffect(() => {
    localStorage.setItem("edit", edit);
  }, [edit]);

  const upload = async (e) => {
    if (file === null) {
      alert("Please choose a file");
    } else {
      const formData = new FormData();
      formData.append("profilePic", file);
      try {
        const res = await axios.post("/profileUpload", formData);
        e.preventDefault();
        await axios.put(`/users/img/${id}`, { img: res.data });
        fetchUserData();
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    // const imgUrl = await upload();
    try {
      await axios.put(`/users/${id}`, {
        fName: updatedUser.firstName,
        lName: updatedUser.lastName,
        username: updatedUser.username,
        location: updatedUser.userLocation,
        email: updatedUser.email,
        about: updatedUser.about,
      });
      setEdit(false);
      fetchUserData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="profile">
      <div className="left">
        <div className="userInfo">
          {user.map((userr) => {
            return (
              <div className="userImage">
                <img
                  src={
                    userr.img === null
                      ? avatar
                      : process.env.PUBLIC_URL + `/profilePic/${userr.img}`
                  }
                  alt=""
                />
                <input
                  type="file"
                  style={{ display: "none" }}
                  id="upload"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                {currentUser.id.toString() === id && (
                  <div className="handleUpload">
                    <label htmlFor="upload">
                      <div className="cameraIconContainer">
                        <CameraAltRoundedIcon className="cameraIcon" />
                      </div>
                    </label>
                    <button className="thisButton" onClick={upload}>
                      Update Profile Picture
                    </button>
                  </div>
                )}
              </div>
            );
          })}

          {edit !== true &&
            user.map((userr) => {
              return (
                <div className="userText">
                  <h2>
                    {userr.fName} <span>{userr.lName}</span>
                  </h2>
                  <h3>{userr.username}</h3>
                  {userr.about === null ? "" : <p>{userr.about}</p>}
                  {currentUser.id.toString() === id && (
                    <button onClick={handleToggle}>Edit profile</button>
                  )}
                  <div className="bottom">
                    <div className="item">
                      {userr.location === null ? (
                        ""
                      ) : (
                        <span>
                          <LocationOnOutlinedIcon /> {userr.location}
                        </span>
                      )}
                    </div>
                    <div className="item">
                      {userr.email === null ? (
                        ""
                      ) : (
                        <span>
                          <EmailOutlinedIcon /> {userr.email}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

          {edit === true && (
            <div className="update">
              <input
                type="text"
                name="firstName"
                value={updatedUser.firstName}
                onChange={handleChange}
              />
              <input
                type="text"
                name="lastName"
                value={updatedUser.lastName}
                onChange={handleChange}
              />
              <input
                type="text"
                name="username"
                value={updatedUser.username}
                onChange={handleChange}
              />
              <textarea
                value={updatedUser.about}
                name="about"
                onChange={handleChange}
              />
              <input
                type="text"
                value={updatedUser.userLocation}
                name="userLocation"
                onChange={handleChange}
              />
              <input
                type="text"
                value={updatedUser.email}
                onChange={handleChange}
                name="email"
              />
              <div className="buttons">
                <button onClick={handleUpdate}>save</button>
                <button onClick={() => setEdit(false)}>cancel</button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="right">
        <div className="posts">
          {posts.map((post) => {
            return (
              <div className="post" key={post.id}>
                <div className="postContainer">
                  <img
                    src={process.env.PUBLIC_URL + `/upload/${post.postImg}`}
                    alt=""
                  />
                  <h5>{post.title}</h5>
                  <Link to={`/post/${post.id}`} className="link">
                    <button>Read</button>
                  </Link>
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
