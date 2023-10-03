import { Link, useNavigate } from "react-router-dom";
import Card from "../../components/card/Card";
import styles from "./Auth.module.scss";
import { TiUserAddOutline } from "react-icons/ti";
import { useState } from "react";
import { toast } from "react-toastify";
import { registerUser, validateEmail } from "../../services/authServices";
import { useDispatch } from "react-redux";
import { setLogin, setUserName } from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const { name, email, password, confirmPassword } = formData;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const register = async (event) => {
    event.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      return toast.error("All fields are required.");
    }
    if (!validateEmail(email)) {
      return toast.error("Make sure you're using a valid email address.");
    }
    if (password.length < 8) {
      return toast.error("Your password must be at least 8 characters.");
    }
    if (password !== confirmPassword) {
      return toast.error("Make sure both passwords are the same.");
    }

    const userData = {
      name,
      email,
      password,
    };

    setIsLoading(true);
    try {
      const data = await registerUser(userData);
      await dispatch(setLogin(true));
      await dispatch(setUserName(data.name));
      navigate("/dashboard");
      setIsLoading(false);
    } catch (error) {
      isLoading(false);

      console.log(error.message);
    }
  };

  return (
    <div className={`container ${styles.auth}`}>
      {isLoading && <Loader />}
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <TiUserAddOutline size={35} color="#999" />
          </div>
          <h2>Register</h2>
          <form onSubmit={register}>
            <input
              type="text"
              placeholder="Name"
              required
              name="name"
              value={name}
              onChange={handleInputChange}
            />
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="Password"
              required
              name="password"
              value={password}
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              required
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleInputChange}
            />
            <button
              type="submit"
              className="--btn --btn-primary --btn-block"
              disabled={isLoading ? true : false}
            >
              Register
            </button>
          </form>
          <span className={styles.register}>
            <Link to="/">Home</Link>
            <p>&nbsp; Already have an account? &nbsp;</p>
            <Link to="/login">Login</Link>
          </span>
        </div>
      </Card>
      ;
    </div>
  );
};

export default Register;
