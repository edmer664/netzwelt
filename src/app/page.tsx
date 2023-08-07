"use client";

import { useEffect, useState } from "react";
import useApi, { ITerritory } from "../hooks/useApi";
import { useRouter } from "next/navigation";

export default function Home() {
  const [territories, setTerritories] = useState([] as ITerritory[] | null);
  const { userData, error, loading, getTerritories } = useApi();
  const router = useRouter();

  useEffect(() => {
    if (userData) {
      getTerritories().then((data) => {
        setTerritories(data);
      });
    } else {
      router.push("/account/login");
    }
  }, [userData]);

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <h1>Territories</h1>
      {/* {territories && (
        <ul>
          {territories.map((territory) => (
            <li key={territory.id}>{territory.name}</li>
          ))}
        </ul>
      )} */}
    </>
  );
}
