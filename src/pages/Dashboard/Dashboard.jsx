import useRedirectLoggedOutUser from "../../customHooks/useRedirectLoggedOutUser";

const Dashboard = () => {
  useRedirectLoggedOutUser("/login");

  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
};

export default Dashboard;
