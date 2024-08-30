export interface DetailPageProps {
  open: boolean;
  onClose: () => void;
}

export interface OpenDataItem {
  [key: string]: string;
  lat: string;
  lng: string;
}

export interface OpenDataResponse {
  data: OpenDataItem[];
}
