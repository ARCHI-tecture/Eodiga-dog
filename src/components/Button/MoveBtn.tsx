import React from 'react';
import Button from "../../components/Button/Button";
import { useMapContext } from "../../contexts/MapContext";

interface MoveButtonProps {
  lat: number | null;
  lng: number | null;
  isDesktop: boolean;
}

const MoveBtn: React.FC<MoveButtonProps> = ({ lat, lng, isDesktop }) => {
  const { setCenter } = useMapContext();

  const handleMoveBtn = () => {
    if (lng !== null && lat !== null) {
      setCenter({ lat, lng });
      window.location.href = `/?lat=${lat}&lng=${lng}`;
    } else {
      alert("해당 장소가 존재하지않습니다");
    }
  };

  return (
    <Button
      variant="pink"
      width={isDesktop ? "w-40" : "w-24"}
      border={isDesktop ? "rounded-2xl" : isDesktop === false ? "rounded-xl" : undefined}
      onClick={handleMoveBtn}
    >
      보러가기
    </Button>
  );
};

export default  MoveBtn;
