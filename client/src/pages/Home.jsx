import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../allContexts/userContext";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const location = useLocation();
  const { currentUser } = useContext(UserContext);

  // const navigate = useNavigate();

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

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  return (
    <div className="home">
      <div className="posts">
        {posts.map((post) => {
          return (
            <div className="post" key={post.id}>
              <div className="img">
                <img src="" alt="" />
              </div>
              <div className="content">
                <Link
                  className="link"
                  to={currentUser === null ? `/login` : `/post/${post.id}`}
                >
                  <h1>{post.title}</h1>{" "}
                </Link>

                <p>{truncate(post.desc, 330)}</p>
                <Link
                  className="link"
                  to={currentUser === null ? `/login` : `/post/${post.id}`}
                >
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
