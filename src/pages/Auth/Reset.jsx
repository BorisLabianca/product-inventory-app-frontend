import { Link, useParams } from "react-router-dom";
import Card from "../../components/card/Card";
import styles from "./Auth.module.scss";
import { MdPassword } from "react-icons/md";
import { useState } from "react";
import { toast } from "react-toastify";
import { resetPassword } from "../../services/authServices";

const initialState = {
  password: "",
  confirmPassword: "",
};

const Reset = () => {
  const [formData, setFormData] = useState(initialState);
  const { password, confirmPassword } = formData;

  const { resetToken } = useParams();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmitReset = async (event) => {
    event.preventDefault();
    if (!password || !confirmPassword) {
      return toast.error("Both fields need to be filled out.");
    }
    if (password.length < 8) {
      return toast.error("Your password must be at least 8 characters long.");
    }
    if (password !== confirmPassword) {
      return toast.error("Both passwords must be the same.");
    }

    const userData = {
      password,
    };

    try {
      const data = await resetPassword(userData, resetToken);
      toast.success(data.message);
    } catch (error) {
      toast.error(error);
      console.log(error.message);
    }
  };

  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <MdPassword size={35} color="#999" />
          </div>
          <h2>Reset Password</h2>
          <form onSubmit={handleSubmitReset}>
            <input
              type="password"
              placeholder="New Password"
              required
              name="password"
              value={password}
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              required
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleInputChange}
            />
            <button type="submit" className="--btn --btn-primary --btn-block">
              Reset Password
            </button>
            <div className={styles.links}>
              <p>
                <Link to="/">- Home</Link>
              </p>
              <p>
                <Link to="/login">- Login</Link>
              </p>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Reset;
