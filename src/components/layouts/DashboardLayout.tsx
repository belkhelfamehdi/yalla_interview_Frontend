import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import Navbar from "./Navbar"; // Make sure Navbar is correctly imported

const DashboardLayout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const { user } = useContext(UserContext);

  return (
    <div className="px-4">
      <Navbar />
      {user && <div>{children}</div>}
    </div>
  );
};

export default DashboardLayout;
