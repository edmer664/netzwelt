type Location = {
  id: string;
  name: string;
  parent: string | null;
  children?: Location[];
};

import React from "react";

type LocationProps = {
  location: Location;
};

const LocationComponent: React.FC<LocationProps> = ({ location }) => {
  return (
    <div className="p-2">
      <div className="font-bold">{location.name}</div>
      {location.children && (
        <div className="pl-4 border-l-2 border-gray-400">
          {location.children.map((child) => (
            <LocationComponent key={child.id} location={child} />
          ))}
        </div>
      )}
    </div>
  );
};

const Hierarchy: React.FC<{ locations: Location[] }> = ({ locations }) => {
  return (
    <div className="p-4">
      {locations.map((location) => (
        <LocationComponent key={location.id} location={location} />
      ))}
    </div>
  );
};

export default Hierarchy;
