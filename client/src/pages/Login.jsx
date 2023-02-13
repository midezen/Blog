import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";

const Login = () => {
  const { login, error } = useContext(AuthContext);

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleClick = (e) => {
    e.preventDefault();
    login(user);
  };
  return (
    <div className="auth">
      <h1>Login</h1>
      <form>
        <input
          type="text"
          name="username"
          onChange={handleChange}
          placeholder="username"
          required
        />
        <input
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="password"
          required
        />
        <button onClick={handleClick}>Login</button>
        {error && <p>{error}</p>}
        <span>
          Don't have an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
