import Script from "next/script";
import {
  Map,
  MapTypeControl,
  useKakaoLoader,
  ZoomControl,
} from "react-kakao-maps-sdk";
import { ClusterMarker } from "./ClusterMarker";
import { useEffect, useRef, useState } from "react";
import { useMap } from "../../contexts/MapContext";

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_API_KEY}&libraries=services,clusterer&autoload=false`;

const KakaoMap = () => {
  // Hook을 이용하여 Kakao 지도 API 불러오기
  const appkey = process.env.REACT_APP_KAKAO_MAP_API_KEY!;
  const [loading, error] = useKakaoLoader({
    appkey,
    libraries: ["clusterer"],
  });

  const mapRef = useRef(null);

  // 최초 설정 좌표: 카카오 본사
  const [center, setCenter] = useState({
    lat: 33.450701,
    lng: 126.570667,
  });
  const { position, setPosition } = useMap();

  // 현재 위치 가져오기
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude });
    });
    navigator.geolocation.watchPosition((pos) => {
      setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
    });
  });

  return (
    <>
      {/* 카카오 지도 javascript API 불러오기 */}
      <Script src={KAKAO_SDK_URL} strategy="beforeInteractive" />
      <Map
        // 최초 설정 좌표: 카카오 본사
        center={position}
        style={{ width: "100%", height: "100%" }}
        level={5}
        ref={mapRef}
      >
        {/* 지도 컨트롤 UI */}
        <MapTypeControl position={"TOPRIGHT"} />
        <ZoomControl position={"RIGHT"} />

        <ClusterMarker />
      </Map>
    </>
  );
};

export default KakaoMap;
