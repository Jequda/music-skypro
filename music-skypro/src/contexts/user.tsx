"use client";

import { getToken } from "@/api/tracks";
import { useRouter } from "next/navigation";
import { FC, PropsWithChildren, createContext, useState } from "react";

function getUserFromLocalStorage() {
  try {
    return JSON.parse(localStorage.getItem("user") || "{}");
  } catch (error) {
    console.log(error);
    return null;
  }
}

type UserContextType = {
  user: any;
  login: (newUser: any, loginData: any) => void;
  logout: () => void;
};

export const UserContext = createContext<UserContextType | null>(null);
export const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(getUserFromLocalStorage());
  function login(newUser: any, loginData: any) {
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    getToken(loginData).then((tokenData) => {
      localStorage.setItem("token", JSON.stringify(tokenData));
      router.push("/");
    });
  }
  function logout() {
    setUser(null);
    localStorage.removeItem("user");
  }

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
