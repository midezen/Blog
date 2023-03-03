import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import { useContext, useEffect, useState } from "react";
import moment from "moment";
import { UserContext } from "../allContexts/userContext";
import DOMPurify from "dompurify";
import Comments from "../components/Comments";
import { axiosInstance } from "../config";

const Single = () => {
  const { currentUser } = useContext(UserContext);

  const [post, setPost] = useState([]);

  const navigate = useNavigate();

  const id = useLocation().pathname.split("/")[2];

  const fetchData = async () => {
    try {
      const res = await axiosInstance.get(`/posts/${id}`);
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
      await axiosInstance.delete(`/posts/${id}`);
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
              {postItem.postImg ? (
                <img
                  src={process.env.PUBLIC_URL + `/upload/${postItem.postImg}`}
                  alt=""
                />
              ) : (
                ""
              )}
              <div className="user">
                <Link to={`/profile/${postItem.uid}`}>
                  <img
                    src={process.env.PUBLIC_URL + `/profilePic/${postItem.img}`}
                    alt=""
                  />
                </Link>
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
              <p
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(postItem.desc),
                }}
              />

              <Comments item={postItem} />
            </div>
            <Menu cat={postItem.cat} />
          </>
        );
      })}
    </div>
  );
};

export default Single;
