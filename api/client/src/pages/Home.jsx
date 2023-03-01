import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../allContexts/userContext";
import DOMPurify from "dompurify";
import { axiosInstance } from "../config";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const location = useLocation();
  const { currentUser } = useContext(UserContext);

  const fetchData = async () => {
    try {
      const res =
        location.search === ""
          ? await axiosInstance.get("/posts/")
          : await axiosInstance.get(`/posts/${location.search}`);

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
                {post.postImg === null ? (
                  ""
                ) : (
                  <img
                    src={process.env.PUBLIC_URL + `/upload/${post.postImg}`}
                    alt=""
                  />
                )}
              </div>
              <div className="content">
                <Link
                  className="link"
                  to={currentUser === null ? "/login" : `/post/${post.id}`}
                >
                  <h1>{post.title}</h1>{" "}
                </Link>

                <p
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(truncate(post.desc, 330)),
                  }}
                />
                <Link
                  className="link"
                  to={currentUser === null ? "/login" : `/post/${post.id}`}
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
