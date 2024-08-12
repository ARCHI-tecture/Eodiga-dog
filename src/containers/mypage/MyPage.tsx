import { useState } from "react";
import ReviewsPage from "../../app/reviews/page";
import BookmarkPage from "../../app/bookmark/page";

import SideMenu from "../../components/SideMenu/SideMenu";

const MyPage = () => {
    //마이페이지에 리뷰와 즐겨찾기 버튼이 공존
    const [selectPage, setSelectPage] = useState<"reviews" | "bookmark">("reviews");

    const handleButtonClick = (page: "reviews" | "bookmark") => {
        setSelectPage(page);
    };

    return (
        <div className="flex">
            <SideMenu selectPage={selectPage} handleButtonClick={handleButtonClick} />

            {/* 버튼을 누르면 하단만 페이지 가 바뀝니다  */}
            <div className="ml-32 mt-16 p-4">
                {selectPage === "reviews" && <ReviewsPage />}
                {selectPage === "bookmark" && <BookmarkPage />}
            </div>
        </div>
    );
};

export default MyPage;
