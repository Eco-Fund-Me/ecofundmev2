"use client";

import { createContext, useContext, ReactNode } from "react";

type UserType = "user" | "admin" | "organization";

interface UserContextType {
  userType: UserType;
  userData: {
    name: string;
    raised?: number;
    backers?: number;
    campaigns?: number;
    donated?: number;
    rewards?: number;
  };
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({
  children,
  userType = "organization",
  userData,
}: {
  children: ReactNode;
  userType: UserType;
  userData: UserContextType["userData"];
}) {
  return (
    <UserContext.Provider value={{ userType, userData }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};
