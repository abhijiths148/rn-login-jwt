import { createContext, useContext } from "react";

export const AuthContext = createContext();

export function useAuth() {
  console.log("1>>>",AuthContext)
  return useContext(AuthContext);
}
