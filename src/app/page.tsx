'use client';
import React from 'react';
import Button from '@mui/material/Button';
import DetailPage from '../containers/map/DetailPage';

const Home: React.FC = () => {
    // 상세정보 토글 상태 관리
    const [open, setOpen] = React.useState(false);
    // Drawer 토글 함수
    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    return (
        <div>
            <Button onClick={toggleDrawer(true)}>임시상세정보버튼</Button>
            <DetailPage open={open} onClose={toggleDrawer(false)} />
        </div>
    );
};

export default Home;
