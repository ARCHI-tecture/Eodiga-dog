import { useQuery } from "@tanstack/react-query";

// 개인키
const API_KEY = 'yAVzxpkULGQRrM5zy4zu8iDmxlYO2S0lyY%2FkF6QV996eDh3eKBzOgM0j7YZwpW%2F%2BECYL4OkhcMNsVYswLD8TwQ%3D%3D';

// export async function getOpenData() {
//     const url = `https://api.odcloud.kr/api/15111389/v1/uddi:41944402-8249-4e45-9e9d-a52d0a7db1cc?page=1&perPage=10&returnType=JSON&serviceKey=${API_KEY}`;
//     const resp = await fetch(url);
//     const data = await resp.json();
//     return data;
// }

export const getOpenData = async () =>{
    const data = await fetch (`https://api.odcloud.kr/api/15111389/v1/uddi:41944402-8249-4e45-9e9d-a52d0a7db1cc?page=1&perPage=10&returnType=JSON&serviceKey=${API_KEY}`)
        .then((resp)=>resp.json())
    return data
}


//데이터 가져오는 코드
    // const [data, setData] = useState<any>(null);
    // useEffect(() => {
    //     const fetchDate = async()=>{
    //         const result = await getOpenData();
    //         setData(result);
    //     };
    //     fetchDate();
    // }, []);

    // useEffect(() => {
    //     console.log(data);
    // }, [data]);

    //return에 작성할코드
    //내용을 전부 출력함
    //{data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
    //특정 정보만 출력하고싶을떄