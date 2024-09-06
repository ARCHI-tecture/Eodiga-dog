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

  interface DetailIsDesktopProps {
    filteredData: FilteredDataItem[] | undefined ;
    sortByOrder: (entries: [string, any][], keysOrder: KeyToShow[]) => [string, any][];
    reviewNumber: number;
    reviewsStar: number;
    keysToShow1: KeyToShow[];
    keysToShow2: KeyToShow[];
    reviewsData: ReviewData[];
    starHandler: (starCount: number) => JSX.Element[];
    drawerOpen: boolean;
    closeIcon: () => void;
  }
