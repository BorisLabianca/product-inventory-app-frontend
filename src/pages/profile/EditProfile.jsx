import { useEffect, useState } from "react";
import "./Profile.scss";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";
import Card from "../../components/card/Card";
import { useNavigate } from "react-router-dom";
import { updateUserProfile } from "../../services/authServices";
import { toast } from "react-toastify";
import ChangePassword from "../../components/changePassword/ChangePassword";

const EditProfile = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUserInfo);
  const { email } = user;
  useEffect(() => {
    if (!email) {
      navigate("/profile");
    }
  }, [email]);
  const initialState = {
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    bio: user?.bio,
    photo: user?.photo,
  };
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState(initialState);
  const [profileImage, setProfileImage] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageChange = (event) => {
    setProfileImage(event.target.files[0]);
  };

  const saveProfile = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", profile?.name);
    formData.append("phone", profile?.phone);
    formData.append("bio", profile?.bio);
    if (profileImage) {
      formData.append("image", profileImage);
    }

    try {
      console.log("Formdata here: ", ...formData);
      const response = await updateUserProfile(formData);
      console.log("Response here: ", response);
      toast.success("User successfully updated.");
      navigate("/profile");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="profile --my2">
      {isLoading && <Loader />}
      <Card cardClass="card --flex-dir-column">
        <span className="profile-photo">
          <img src={user?.photo} alt={user?.name} />
        </span>
        <form className="--form-control --m" onSubmit={saveProfile}>
          <span className="profile-data">
            <p>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={profile?.name}
                onChange={handleInputChange}
              />
            </p>
            <p>
              <label>Email:</label>
              <input type="text" name="email" value={profile?.email} disabled />
              <br />
              <code>Email cannot be changed.</code>
            </p>
            <p>
              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                value={profile?.phone}
                onChange={handleInputChange}
              />
            </p>
            <p>
              <label>Bio:</label>
              <textarea
                name="bio"
                value={profile?.bio}
                onChange={handleInputChange}
                cols="30"
                rows="10"
              ></textarea>
            </p>
            <p>
              <label>Photo:</label>
              <input type="file" name="image" onChange={handleImageChange} />
            </p>
            <div>
              <button className="--btn --btn-primary">Save Changes</button>
            </div>
          </span>
        </form>
      </Card>
      <br />
      <ChangePassword />
    </div>
  );
};

export default EditProfile;
