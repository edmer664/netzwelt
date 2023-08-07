import { AxiosError } from "axios";
import axios from "axios";
import { useState } from "react";

export interface IUserData {
  username: string;
  displayName: string;
  roles: string[];
}

export interface ITerritory {
  id: string;
  name: string;
  parent: string | null;
}

export default function useApi() {
  const storedUserData = localStorage.getItem("userData");
  const initialUserData = storedUserData ? JSON.parse(storedUserData) : null;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null as string | null);
  const [userData, setUserData] = useState<IUserData | null>(initialUserData);

  interface ILogin {
    username: string;
    password: string;
  }

  async function login(data: ILogin): Promise<IUserData | null> {
    setLoading(true);
    setError(null);

    if (userData) {
      setLoading(false);
      return userData;
    }

    try {
      const response = await axios.post("/api/login", data);
      setLoading(false);
      setUserData(response.data);
      localStorage.setItem("userData", JSON.stringify(response.data));
      return response.data;
    } catch (error: AxiosError | any) {
      setLoading(false);
      setError("Invalid username or password. Please try again.");
    }
    return null;
  }

  function logout() {
    localStorage.removeItem("userData");
    setUserData(null);
  }

  async function getTerritories(): Promise<{ data: ITerritory[] } | null> {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("/api/territories ");
      setLoading(false);
      return response.data;
    } catch (error: AxiosError | any) {
      setLoading(false);
      setError(error);
    }
    return null;
  }

  return {
    loading,
    error,
    userData,
    login,
    logout,
    getTerritories,
  };
}
