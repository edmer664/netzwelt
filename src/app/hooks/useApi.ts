import { AxiosError } from "axios";
import axios from "../utils/axios";
import { useState } from "react";

export default function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  interface ILogin {
    username: string;
    password: string;
  }

  async function login(data: ILogin) {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("/login", data);
      setLoading(false);
      return response.data;
    } catch (error: AxiosError | any) {
      setLoading(false);
      setError(error);
    }
  }

  async function getTerritories() {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("/Territories/All ");
      setLoading(false);
      return response.data;
    } catch (error: AxiosError | any) {
      setLoading(false);
      setError(error);
    }
  }

  return {
    loading,
    error,
    login,
    getTerritories,
  };
}
