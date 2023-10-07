import { useState } from "react";
import "./ChangePassword.scss";
import { toast } from "react-toastify";
import { changePassword } from "../../services/authServices";
import Card from "../card/Card";

const initialState = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const ChangePassword = () => {
  const [passwords, setPasswords] = useState(initialState);
  const { oldPassword, newPassword, confirmPassword } = passwords;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPasswords({ ...passwords, [name]: value });
  };

  const updatePassword = async (event) => {
    event.preventDefault();
    if (!oldPassword || !newPassword || !confirmPassword) {
      return toast.error("Please fill out all the fields.");
    }

    if (newPassword < 8) {
      toast.error("Your password must be at least 8 characters long.");
    }

    if (newPassword !== confirmPassword) {
      return toast.error("Both new passwords must be the same.");
    }

    const formData = {
      oldPassword,
      newPassword,
    };

    const data = await changePassword(formData);
    toast.success(data);
  };

  return (
    <div className="change-password">
      <div className="password-card">
        <h3>Change Password</h3>
        <form className="--form-control" onSubmit={updatePassword}>
          <input
            type="password"
            placeholder="Old password"
            name="oldPassword"
            value={oldPassword}
            onChange={handleInputChange}
          />
          <input
            type="password"
            placeholder="New password"
            name="newPassword"
            value={newPassword}
            onChange={handleInputChange}
          />
          <input
            type="password"
            placeholder="Confirm new password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleInputChange}
          />
          <button className="--btn --btn-primary" type="submit">
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
