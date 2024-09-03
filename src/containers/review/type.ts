interface Review {
    user_id: string | null | undefined;
    id: number;
    date: string;
    shopname: string;
    content: string;
    lat: number;
    lng: number;
  }