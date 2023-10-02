import { FaTh, FaCommentAlt, FaUserEdit } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { MdAssignmentAdd, MdManageAccounts } from "react-icons/md";

export const iconDealer = (child, iconTitle) => {
  if (child) {
    if (iconTitle === "FaTh") {
      return <FaTh />;
    } else if (iconTitle === "FaCommentAlt") {
      return <FaCommentAlt />;
    } else if (iconTitle === "ImProfile") {
      return <ImProfile />;
    } else if (iconTitle === "MdAssignmentAdd") {
      return <MdAssignmentAdd />;
    } else if (iconTitle === "MdManageAccounts") {
      return <MdManageAccounts />;
    } else if (iconTitle === "FaUserEdit") {
      return <FaUserEdit />;
    }
  } else {
    if (iconTitle === "FaTh") {
      return <FaTh />;
    } else if (iconTitle === "FaCommentAlt") {
      return <FaCommentAlt />;
    } else if (iconTitle === "ImProfile") {
      return <ImProfile />;
    } else if (iconTitle === "MdAssignmentAdd") {
      return <MdAssignmentAdd />;
    } else if (iconTitle === "MdManageAccounts") {
      return <MdManageAccounts />;
    } else if (iconTitle === "FaUserEdit") {
      return <FaUserEdit />;
    }
  }
};
