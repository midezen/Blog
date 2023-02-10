import { Link } from "react-router-dom";

const Home = () => {
  const posts = [
    {
      id: "1",
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      img: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8YmxvZyUyMHBvc3R8ZW58MHx8MHx8&auto=format&fit=crop&w=1600&q=60",
    },
    {
      id: "2",
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      img: "https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGJsb2clMjBwb3N0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1600&q=60",
    },
    {
      id: "3",
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      img: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGJsb2clMjBwb3N0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1600&q=60",
    },
    {
      id: "4",
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      img: "https://media.istockphoto.com/id/1164102275/photo/laptops-on-the-desk.jpg?b=1&s=170667a&w=0&k=20&c=1D18f3uccSYyGU1prdzdYa0z-AHqR8ySHN2HHuTd5s8=",
    },
    {
      id: "5",
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      img: "https://media.istockphoto.com/id/1182866691/photo/social-media-and-digital-online-concept-woman-using-smartphone-and-show-technology-icon.jpg?b=1&s=170667a&w=0&k=20&c=pqLif8f3YazKKkHUeQGMDN3DompPwyO4FdGby70fVX0=",
    },
  ];

  return (
    <div className="home">
      <div className="posts">
        {posts.map((post) => {
          return (
            <div className="post" key={post.id}>
              <div className="img">
                <img src={post.img} alt="" />
              </div>
              <div className="content">
                <Link className="link" to={`/post/${post.id}`}>
                  <h1>{post.title}</h1>{" "}
                </Link>
                <p>{post.desc}</p>
                <button>Read More</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
