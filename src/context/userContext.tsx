import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // New state to track loading

  useEffect(() => {
    if (user) return;
    
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchUser();
  }, []);

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("token", userData.token); // Store token in local storage
    setLoading(false); // Set loading to false after updating user
  }
  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("token"); // Remove token from local storage
  }

  return (
    <UserContext.Provider value={{ user, loading, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
