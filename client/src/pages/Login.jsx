import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../allContexts/userContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const [error, setError] = useState(null);

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await login(user);
      navigate("/");
    } catch (err) {
      console.log(err.response.data);
      setError(err.response.data);
    }
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
