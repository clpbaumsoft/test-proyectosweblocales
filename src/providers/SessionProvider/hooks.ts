import { useContext } from "react";

//Providers
import SessionProviderContext from "./context";

export default function useSessionProviderHook() {
  const context = useContext(SessionProviderContext)
  if (!context) {
    throw new Error("useSessionProviderHook must be used within an SessionProvider");
  }
  return context;
}