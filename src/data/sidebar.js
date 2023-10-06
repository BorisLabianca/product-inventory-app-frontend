const menu = [
  {
    title: "Dashboard",
    icon: "FaTh",
    path: "/dashboard",
  },
  {
    title: "Add Product",
    icon: "MdAssignmentAdd",
    path: "/add-product",
  },
  {
    title: "Account",
    icon: "MdManageAccounts",
    children: [
      {
        title: "Profile",
        icon: "ImProfile",
        path: "/profile",
      },
      {
        title: "Edit Profile",
        icon: "FaUserEdit",
        path: "/edit-profile",
      },
    ],
  },
  {
    title: "Report Bug",
    icon: "FaCommentAlt",
    path: "/contact-us",
  },
];

export default menu;
