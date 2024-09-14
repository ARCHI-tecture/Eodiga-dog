interface FilteredDataItem {
    시설명?: string;
    "기본 정보_장소설명"?: string;
    [key: string]: any;
  }

  interface KeyToShow {
    text: string;
    icon?: React.ReactNode;
  }

  interface ReviewData {
    id: number;
    user_id: string;
    star: number;
    content: string;
  }
  interface DetailPageProps {
    item: { lat: string | null; lng: string | null };
    reviewNumber: number;
    reviewsStar: number;
    reviewsData: any;
    filteredData: any[];
    drawerOpen: boolean;   // boolean 타입으로 정의
    closeIcon: () => void; // 함수 타입으로 정의
  }


  interface OpenDataItem {
    [key: string]: string;
    lat: string;
    lng: string;
  }

  interface OpenDataResponse {
    data: OpenDataItem[];
  }

  interface DetailIsDesktopProps {
    filteredData: any;
    sortByOrder: (entries: [string, string][], keysOrder: { text: string }[]) => [string, string][];
    reviewNumber: number;
    reviewsStar: number;
    keysToShow1: { text: string }[];
    keysToShow2: { icon: JSX.Element; text: string }[];
    reviewsData: any[];
    starHandler: (starCount: number) => JSX.Element[];
    drawerOpen: boolean;
    closeIcon: () => void;
  }