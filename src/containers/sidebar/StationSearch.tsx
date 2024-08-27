import React, { useState } from "react";
import SearchInput from "../../components/Filter/SearchInput";

interface StationSearchProps {
  onSearch: (query: string) => void;
}

const StationSearch: React.FC<StationSearchProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <SearchInput
      width="100%"
      // value={searchQuery} // 입력한 검색어를 input 엘리먼트에 표시
      handleSearchChange={handleSearchChange}
      onClick={handleSearch}
    />
  );
};

export default StationSearch;
