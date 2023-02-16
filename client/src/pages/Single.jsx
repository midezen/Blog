import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import { Link, useLocation } from "react-router-dom";
import Menu from "../components/Menu";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import moment from "moment";
import { UserContext } from "../allContexts/userContext";

const Single = () => {
  const { currentUser } = useContext(UserContext);

  const [post, setPost] = useState([]);

  const id = useLocation().pathname.split("/")[2];

  console.log(id);

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
  }, []);

  return (
    <div className="single">
      {post.map((postItem) => {
        return (
          <>
            <div className="content">
              <img src={postItem.postImg} alt="" />
              <div className="user">
                <img src={postItem.img} alt="" />
                <div className="info">
                  <span>{postItem.fName}</span>
                  <p>Posted {moment(postItem.date).fromNow()}</p>
                </div>
                {currentUser.fName === postItem.fName && (
                  <div className="edit">
                    <Link to={`/write?edit=5`}>
                      <img src={Edit} alt="" />
                    </Link>

                    <img src={Delete} alt="" />
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
