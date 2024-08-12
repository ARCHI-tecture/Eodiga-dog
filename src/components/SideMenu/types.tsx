interface SideMenuProps {
    selectPage: "reviews" | "bookmark";
    handleButtonClick: (page: "reviews" | "bookmark") => void;
}
