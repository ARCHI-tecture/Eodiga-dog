import { useEffect, useRef, useState } from "react";
import { placeList } from "../../utils/db/placeList";
import { MapMarker, MarkerClusterer } from "react-kakao-maps-sdk";

export const ClusterMarker = () => {
  const mapRef = useRef(null);
  // 좌표 데이터
  const [coordinate, setCoordinate] = useState([]);

  useEffect(() => {
    const fetchCoordinates = async () => {
      const coords = await placeList();
      setCoordinate(coords);
    };

    fetchCoordinates();
  }, []);

  const onClusterclick = (_target, cluster) => {
    const map = mapRef.current;
    // 현재 지도 레벨에서 1레벨 확대한 레벨
    const level = map.getLevel() - 1;

    // 지도를 클릭된 클러스터의 마커의 위치를 기준으로 확대합니다
    map.setLevel(level, { anchor: cluster.getCenter() });
  };

  return (
    // 마커 클러스터
    <MarkerClusterer
      // 클러스터 마커 위치: 포함된 마커들의 평균 위치
      averageCenter={true}
      // 클러스터 할 최소 지도 레벨
      minLevel={7}
      disableClickZoom={true}
      // 마커 클러스터러에 클릭이벤트를 등록합니다
      // 마커 클러스터러를 생성할 때 disableClickZoom을 true로 설정하지 않은 경우
      // 이벤트 헨들러로 cluster 객체가 넘어오지 않을 수도 있습니다
      onClusterclick={onClusterclick}
    >
      {/* <> */}
      {coordinate.map((coord) => (
        <MapMarker
          key={`${coord.lat}-${coord.lng}`}
          position={{
            lat: coord.lat,
            lng: coord.lng,
          }}
        />
      ))}
      {/* </> */}
    </MarkerClusterer>
  );
};

export default ClusterMarker;
