import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getLoginStatus } from "../services/authServices";
import { setLogin } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const useRedirectLoggedOutUser = (path) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const redirectLoggedOutUser = async () => {
      const isLoggedIn = await getLoginStatus();
      dispatch(setLogin(isLoggedIn));

      if (!isLoggedIn) {
        toast.info("The session expired. Please log in to resume activity.");
        navigate(path);
        return;
      }
    };
    redirectLoggedOutUser();
  }, []);
};

export default useRedirectLoggedOutUser;
