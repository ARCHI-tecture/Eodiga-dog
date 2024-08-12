import Script from "next/script";
import { Map } from "react-kakao-maps-sdk";
import { ClusterMarker } from "./ClusterMarker";
import { useRef } from "react";

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_API_KEY}&autoload=false`;

const KakaoMap = () => {
  const mapRef = useRef();

  const onClusterclick = (_target: any, cluster: any) => {
    const map: any = mapRef.current;
    // 현재 지도 레벨에서 1레벨 확대한 레벨
    const level = map.getLevel() - 1;

    // 지도를 클릭된 클러스터의 마커의 위치를 기준으로 확대합니다
    map.setLevel(level, { anchor: cluster.getCenter() });
  };

  return (
    <>
      {/* 카카오 지도 javascript API 불러오기 */}
      <Script src={KAKAO_SDK_URL} strategy="beforeInteractive" />
      <Map
        center={{ lat: 37.64454276, lng: 126.886336 }}
        style={{ width: "100%", height: "100%" }}
        level={14}
        ref={mapRef}
      >
        <ClusterMarker />
      </Map>
    </>
  );
};

export default KakaoMap;
