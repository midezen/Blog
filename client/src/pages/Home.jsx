import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const location = useLocation();

  const fetchData = async () => {
    try {
      const res =
        location.search === ""
          ? await axios.get("/posts/")
          : await axios.get(`/posts/${location.search}`);
      console.log(posts);
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [location.search]);

  return (
    <div className="home">
      <div className="posts">
        {posts.map((post) => {
          return (
            <div className="post" key={post.id}>
              <div className="img">{/* <img src={dposts.img} alt="" /> */}</div>
              <div className="content">
                <Link className="link" to={`/post/${post.id}`}>
                  <h1>{post.title}</h1>{" "}
                </Link>
                <p>{post.desc}</p>
                <Link className="link" to={`/post/${post.id}`}>
                  <button>Read More</button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
