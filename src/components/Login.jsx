// Login.jsx
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { username, password } = event.target.elements;
    const usernameCp =
      username.value === "mtguest" ? "marcusfgreen@gmail.com" : false;

    try {
      await signInWithEmailAndPassword(auth, usernameCp, password.value);
      onLogin();
      navigate("/");
    } catch (error) {
      console.error("Authentication error:", error);
    }
  };

  return (
    <div className="login-container homebg">
      <form className="login-form" onSubmit={handleSubmit}>
        <input name="username" type="text" placeholder="username" required />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
