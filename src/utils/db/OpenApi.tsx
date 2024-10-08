//open api를 가져오는 코드 react-query 사용- DetailPage.tsx 와 연결
// 개인키
const API_KEY =
  "yAVzxpkULGQRrM5zy4zu8iDmxlYO2S0lyY%2FkF6QV996eDh3eKBzOgM0j7YZwpW%2F%2BECYL4OkhcMNsVYswLD8TwQ%3D%3D";

export const getOpenData = async (lat: string | null, lng: string | null) => {
  const data = await fetch(
    `https://api.odcloud.kr/api/15111389/v1/uddi:41944402-8249-4e45-9e9d-a52d0a7db1cc?page=1&perPage=3618&returnType=JSON&serviceKey=${API_KEY}`
  ).then((resp) => resp.json());
  return data;
};