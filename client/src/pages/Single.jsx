import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import moment from "moment";
import { UserContext } from "../allContexts/userContext";

const Single = () => {
  const { currentUser } = useContext(UserContext);

  const [post, setPost] = useState([]);

  const navigate = useNavigate();

  const id = useLocation().pathname.split("/")[2];

  const fetchData = async () => {
    try {
      const res = await axios.get(`/posts/${id}`);
      setPost(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${id}`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="single">
      {post.map((postItem) => {
        return (
          <>
            <div className="content">
              <img
                src={process.env.PUBLIC_URL + `/upload/${postItem.postImg}`}
                alt=""
              />

              <div className="user">
                <img
                  src={process.env.PUBLIC_URL + `/upload/${postItem.img}`}
                  alt=""
                />
                <div className="info">
                  <span>{postItem.username}</span>
                  <p>Posted {moment(postItem.date).fromNow()}</p>
                </div>
                {currentUser.username === postItem.username && (
                  <div className="edit">
                    <Link to={`/write?edit=${id}`} state={postItem}>
                      <img src={Edit} alt="" />
                    </Link>

                    <img src={Delete} alt="" onClick={handleDelete} />
                  </div>
                )}
              </div>
              <h1>{postItem.title}</h1>
              <p>{postItem.desc}</p>
            </div>
            <Menu cat={postItem.cat} />
          </>
        );
      })}
    </div>
  );
};

export default Single;
