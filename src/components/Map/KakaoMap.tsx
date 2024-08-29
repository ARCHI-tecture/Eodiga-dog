import Script from "next/script";
import {
  Map,
  MapTypeControl,
  useKakaoLoader,
  ZoomControl,
} from "react-kakao-maps-sdk";
import { ClusterMarker } from "./ClusterMarker";
import { useEffect, useRef, useState } from "react";
import { useMapContext } from "../../contexts/MapContext";
import { useSearchParams } from "next/navigation";

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_API_KEY}&libraries=services,clusterer&autoload=false`;

const KakaoMap = () => {
  // Hook을 이용하여 Kakao 지도 API 불러오기
  const appkey = process.env.REACT_APP_KAKAO_MAP_API_KEY!;
  const [loading, error] = useKakaoLoader({
    appkey,
    libraries: ["clusterer"],
  });

  const mapRef = useRef<any>();
  const searchParams = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  console.log(lat, lng);

  // 최초 설정 좌표: 카카오 본사
  const { center, setCenter } = useMapContext();

  // 현재 위치 가져오기
  useEffect(() => {
    if (lat && lng) {
      // URL에 lat과 lng가 제공되면 center 업데이트
      setCenter({
        lat: parseFloat(lat),
        lng: parseFloat(lng),
      });
    } else {
      // URL에 lat/lng가 없을 경우 center = 현재 위치
      navigator.geolocation.getCurrentPosition((pos) => {
        setCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      });
    }
  }, [lat, lng, setCenter]);

  useEffect(() => {
    // center가 변경될 때마다 지도의 center를 업데이트
    if (mapRef.current) {
      const mapInstance = new kakao.maps.Map(mapRef.current, {
        center: new kakao.maps.LatLng(center.lat, center.lng),
        level: 5,
      });
      mapRef.current = mapInstance;
    }
  }, []);

  return (
    <>
      {/* 카카오 지도 javascript API 불러오기 */}
      <Script src={KAKAO_SDK_URL} strategy="beforeInteractive" />
      <Map
        // 최초 설정 좌표: 카카오 본사
        center={center}
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
