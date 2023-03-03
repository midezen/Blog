import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { axiosInstance } from "../config";

const Register = () => {
  const [error, setError] = useState(null);
  const [user, setUser] = useState({
    fName: "",
    lName: "",
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/auth/register", user);
      navigate("/login");
    } catch (err) {
      setError(JSON.stringify(err.response.data));
    }
  };
  return (
    <div className="auth">
      <h1>Register</h1>
      <form>
        <input
          type="text"
          onChange={handleChange}
          name="fName"
          placeholder="First Name"
          required
        />
        <input
          type="text"
          onChange={handleChange}
          name="lName"
          placeholder="Last Name"
          required
        />
        <input
          type="text"
          onChange={handleChange}
          name="username"
          placeholder="Username"
          required
        />
        <input
          type="email"
          onChange={handleChange}
          name="email"
          placeholder="email"
          required
        />
        <input
          type="password"
          onChange={handleChange}
          name="password"
          placeholder="password"
          required
        />
        <button onClick={handleClick}>Register</button>
        {error && <p>{error}</p>}
        <span>
          Have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
