"use client";

import { useEffect, useState } from "react";
import useApi, { ITerritory } from "../hooks/useApi";
import { useRouter } from "next/navigation";
import Hierarchy from "@/components/Hierarchy";

export default function Home() {
  const [territories, setTerritories] = useState([] as ITerritory[] | null);
  const [orderedTerritories, setOrderedTerritories] = useState([] as any);
  const { userData, error, loading, getTerritories, logout } = useApi();
  const router = useRouter();

  useEffect(() => {
    if (userData) {
      getTerritories().then((data) => {
        if (data === null) {
          return;
        }
        setTerritories(data.data);
      });
    } else {
      router.push("/account/login");
    }
  }, [userData]);

  interface ITerritory {
    id: string;
    name: string;
    parent: string | null;
    children?: ITerritory[];
  }

  function nestTerritories(data: ITerritory[]): ITerritory[] {
    const tempArray: ITerritory[] = [];

    const lookup: { [key: string]: ITerritory } = {};
    data.forEach((territory) => {
      lookup[territory.id] = { ...territory, children: [] };
    });

    data.forEach((territory) => {
      if (territory.parent === null) {
        tempArray.push(lookup[territory.id]);
      } else {
        const parent = lookup[territory.parent];
        if (parent) {
          parent.children!.push(lookup[territory.id]);
        }
      }
    });

    data.forEach((territory) => {
      if (lookup[territory.id].children!.length === 0) {
        delete lookup[territory.id].children;
      }
    });

    return tempArray;
  }

  useEffect(() => {
    if (territories) {
      setOrderedTerritories(nestTerritories(territories));
    }
  }, [territories]);

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <h1 className="text-2xl font-bold">Territories</h1>

      <Hierarchy locations={orderedTerritories} />

      <button
        className="fixed bottom-10 right-10 p-4 text-white bg-red-500 rounded-full cursor-pointer"
        onClick={() => logout()}
      >
        Logout
      </button>
    </>
  );
}
