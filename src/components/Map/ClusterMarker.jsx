import { useEffect, useRef, useState } from "react";
import { placeList } from "../../utils/db/PlaceList";
import { MapMarker, MarkerClusterer } from "react-kakao-maps-sdk";
import DetailPage from "../../containers/map/DetailPage";

export const ClusterMarker = () => {
  const mapRef = useRef(null);
  // 좌표 데이터
  const [coordinate, setCoordinate] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      const coords = await placeList();
      setCoordinate(coords);
    };

    fetchCoordinates();
  }, []);

  const onClusterclick = (_target, cluster) => {
    const map = mapRef.current;
    if (map) {
      // 현재 지도 레벨에서 1레벨 확대한 레벨
      const level = map.getLevel() - 1;

      // 지도를 클릭된 클러스터의 마커의 위치를 기준으로 확대합니다
      map.setLevel(level, { anchor: cluster.getCenter() });
    }
  };

  return (
    // 마커 클러스터
    <MarkerClusterer
      // 클러스터 마커 위치: 포함된 마커들의 평균 위치
      averageCenter={true}
      // 클러스터 할 최소 지도 레벨
      minLevel={7}
      disableClickZoom={false}
      // 마커 클러스터러에 클릭이벤트를 등록합니다
      // 마커 클러스터러를 생성할 때 disableClickZoom을 true로 설정하지 않은 경우
      // 이벤트 헨들러로 cluster 객체가 넘어오지 않을 수도 있습니다
      onClusterclick={onClusterclick}
    >
      {/* <> */}
      {coordinate.map((coord, index) => (
        <MapMarker
          key={`${index}`}
          position={{
            lat: coord.lat,
            lng: coord.lng,
          }}
          // 마커 데이터 전달
          onClick={() => setSelectedMarker(coord)}
        >
          {selectedMarker &&
            selectedMarker.lat === coord.lat &&
            selectedMarker.lng === coord.lng && (
              <DetailPage
                open={Boolean(selectedMarker)}
                // DetailPage를 닫을 때 선택된 마커 초기화
                onClose={() => setSelectedMarker(null)}
                item={selectedMarker}
              />
            )}
        </MapMarker>
      ))}
    </MarkerClusterer>
  );
};

export default ClusterMarker;
