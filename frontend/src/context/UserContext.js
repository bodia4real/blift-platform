import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { encrypt, decrypt } from "../utils/encryption";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const isLogin = localStorage.getItem("login");
    if (!isLogin) return;

    if (!data) {
      const encryptedEmail = localStorage.getItem("email");
      const email = decrypt(encryptedEmail);

      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/auth/me`, {
          params: { email },
        })
        .then((res) => {
          const userData = {
            ...res.data,
            role:
              res.data.role.charAt(0).toUpperCase() +
              res.data.role.slice(1).toLowerCase(),
          };
          setData(userData);
        })
        .catch((err) => {
          console.error("Failed to fetch user data:", err);
        });
    }
  }, [isLogged, setIsLogged]);

  const login = (email) => {
    const encryptedEmail = encrypt(email);
    localStorage.setItem("email", encryptedEmail);
    localStorage.setItem("login", "true");
    setIsLogged(true);
  };

  const logout = () => {
    setIsLogged(false);
    setData("");
    localStorage.clear();
  };

  return (
    <UserContext.Provider value={{ login, logout, data }}>
      {children}
    </UserContext.Provider>
  );
};
