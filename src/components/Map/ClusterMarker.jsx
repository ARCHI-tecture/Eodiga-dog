import { useEffect, useRef, useState } from "react";
import { placeList } from "../../utils/db/PlaceList";
import { MapMarker, MarkerClusterer } from "react-kakao-maps-sdk";
import DetailPage from "../../containers/map/DetailPage";

export const ClusterMarker = () => {
  const mapRef = useRef(null);
  // 좌표 데이터
  const [coordinate, setCoordinate] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [open, setOpen] = useState(false); // DetailPage 열림 상태 관리

  useEffect(() => {
    const fetchCoordinates = async () => {
      const coords = await placeList();
      setCoordinate(coords);
    };

    fetchCoordinates();
  }, []);

  // 클러스터 클릭 시 확대하는 함수
  const onClusterclick = (_target, cluster) => {
    const map = mapRef.current;
    if (map) {
      const level = map.getLevel() - 1;
      map.setLevel(level, { anchor: cluster.getCenter() });
    }
  };

 // 마커 클릭 시 DetailPage 열기
  const handleMarkerClick = (coord) => {
    //같은 마커를 또한번 클릭했을경우
    if (selectedMarker && selectedMarker.lat === coord.lat && selectedMarker.lng === coord.lng) {
    // 동일한 마커 클릭 시 닫고 다시 열기 위해 일시적으로 null로 설정
    //0-> 0초 시간차 없이 즉시  클릭 가능하여 열수있도록
      setSelectedMarker(null);
      setTimeout(() => {
        setSelectedMarker(coord);
        setOpen(true);
      }, 0);
    } else {
      //다른마커를 선택할경우 혹은 처음 시작하여 이전 기록의 마커가 없는경우 DetailPage열림
      setSelectedMarker(coord);
      setOpen(true);
    }
};


  // DetailPage 닫기
  const handleClose = () => {
    setOpen(false); // DetailPage 닫기
    setSelectedMarker(null); // 선택된 마커 초기화
  };

  return (
    <MarkerClusterer
      averageCenter={true}
      minLevel={7}
      disableClickZoom={false}
      onClusterclick={onClusterclick}
    >
      {coordinate.map((coord, index) => (
        <MapMarker
          key={`${index}`}
          position={{
            lat: coord.lat,
            lng: coord.lng,
          }}
          // 마커 클릭 시 선택된 마커 설정 및 DetailPage 열기
          onClick={() => handleMarkerClick(coord)}
        />
      ))}

      {/* 선택된 마커가 있을 경우 DetailPage 컴포넌트 표시 */}
      {selectedMarker && (
        <DetailPage
          open={open}
          onClose={handleClose} // 닫기 핸들러 전달
          item={selectedMarker} // 선택된 마커 정보 전달
        />
      )}
    </MarkerClusterer>
  );
};

export default ClusterMarker;
