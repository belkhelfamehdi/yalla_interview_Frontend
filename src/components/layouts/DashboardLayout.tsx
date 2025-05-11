import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import Navbar from "./Navbar";

const DashboardLayout: React.FC<React.PropsWithChildren<object>> = ({ children }) => {
  const { user } = useContext(UserContext)!;

  return (
    <div className="px-4">
      <Navbar />
      {user && <div>{children}</div>}
    </div>
  );
};

export default DashboardLayout;
