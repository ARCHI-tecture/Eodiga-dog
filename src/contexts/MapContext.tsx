import { createContext, useContext, useState } from "react";

interface MapContextType {
  center: {
    lat: number;
    lng: number;
  };
  setCenter: React.Dispatch<React.SetStateAction<{ lat: number; lng: number }>>;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

export const MapProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [center, setCenter] = useState<{ lat: number; lng: number }>({
    lat: 33.450701,
    lng: 126.570667,
  });

  return (
    <MapContext.Provider value={{ center, setCenter }}>
      {children}
    </MapContext.Provider>
  );
};

export const useMapContext = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMap must be used within a MapProvider");
  }
  return context;
};
