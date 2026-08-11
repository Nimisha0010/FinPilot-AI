import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { getProfile } from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);


  // ========================================
  // LOAD USER WHEN APP STARTS
  // ========================================
  useEffect(() => {

    const loadUser = async () => {

      const token =
        localStorage.getItem("fp_token");


      // No token → user is not logged in
      if (!token) {

        setLoading(false);

        return;
      }


      try {

        const data =
          await getProfile();


        if (data?.success && data?.user) {

          setUser(data.user);

        } else {

          localStorage.removeItem(
            "fp_token"
          );

          setUser(null);

        }

      } catch (error) {

        console.error(
          "Failed to load user:",
          error
        );

        localStorage.removeItem(
          "fp_token"
        );

        setUser(null);

      } finally {

        setLoading(false);

      }

    };


    loadUser();

  }, []);


  // ========================================
  // LOGIN
  // ========================================
  const login = (token, userData) => {

    if (token) {

      localStorage.setItem(
        "fp_token",
        token
      );

    }

    setUser(userData);

  };


  // ========================================
  // LOGOUT
  // ========================================
  const logout = () => {

    localStorage.removeItem(
      "fp_token"
    );

    setUser(null);

  };


  return (

    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>

  );

}


export function useAuthContext() {

  return useContext(AuthContext);

}