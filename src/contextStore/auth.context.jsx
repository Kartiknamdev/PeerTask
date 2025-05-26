import { createContext, useContext, useMemo, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../constant";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [authUser, setAuthUser] = useState(null);
  const [authError, setAuthError] = useState(null);

  // Register user
  const registerUser = async (fullName, email, password) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/users/register`,
        { fullName, email, password }
      );
      if (response) {
        setAuthUser(response.data.data);
        setAuthError(null);
      }
    } catch (error) {
      console.error("Registration error:", error);
      setAuthError(error.response?.data || error.message);
    }
  };

  // Login user
  const loginUser = async (email, password) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/users/login`,
        { email, password }
      );
      if (response) {
        setAuthUser(response.data.data);
        setAuthError(null);
      }
    } catch (error) {
      console.error("Login error:", error);
      setAuthError(error.response?.data || error.message);
    }
  };

  // Update user details
  const updateDetails = async (formData) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/users/update_details`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${authUser?.accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setAuthUser((prevUser) => ({
          ...prevUser,
          ...response.data.data,
        }));
        setAuthError(null);
      }
    } catch (error) {
      console.error("Update details error:", error);
      setAuthError(error.response?.data || error.message);
    }
  };

  const contextItems = useMemo(
    () => ({
      user: authUser,
      error: authError,
      registerUser,
      loginUser,
      updateDetails,
    }),
    [authUser, authError]
  );

  return (
    <AuthContext.Provider value={contextItems}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
