import { createContext, useContext, useState } from "react";

interface Coordinates {
  lat: number;
  lng: number;
}

interface MapContextProps {
  position: Coordinates;
  setPosition: (coords: Coordinates) => void;
}

const MapContext = createContext<MapContextProps | undefined>(undefined);

export const MapProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [position, setPosition] = useState<Coordinates>({
    // 초기 좌표
    lat: 33.450701,
    lng: 126.570667,
  });

  return (
    <MapContext.Provider
      value={{
        position,
        setPosition,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export const useMap = (): MapContextProps => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMap must be used within a MapProvider");
  }
  return context;
};
