"use client";
import { useEffect } from "react";

export default function ClearClientStorage() {
  useEffect(() => {
    // Limpiar localStorage y sessionStorage
    localStorage.clear();
    sessionStorage.clear();

    // Limpiar todas las cookies
    document.cookie.split(";").forEach(function(c) {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
  }, []);

  return null;
}