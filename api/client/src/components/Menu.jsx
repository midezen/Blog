import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../config";
const Menu = ({ cat }) => {
  const [posts, setPosts] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axiosInstance.get(`/posts/?cat=${cat}`);
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="menu">
      <h1>Other Posts You May Like</h1>
      {posts.map((post) => {
        return (
          <div className="post" key={post.id}>
            {post.postImg ? (
              <img
                src={process.env.PUBLIC_URL + `/upload/${post.postImg}`}
                alt=""
              />
            ) : (
              ""
            )}
            <h2>{post.title}</h2>
            <Link className="link" to={`/post/${post.id}`}>
              <button>Read More</button>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Menu;
