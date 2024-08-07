'use client';
import React, { useEffect, useState } from 'react';
import { getOpenData } from '../../utils/db/open_api';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useQuery } from '@tanstack/react-query';

interface DetailPageProps {
    open: boolean;
    onClose: () => void;
}

interface OpenDataItem {
    [key: string]: any;
}

interface OpenDataResponse {
    data: OpenDataItem[];
}
//상태관리를 useQuery로 관리
//모든 data를 출력하는데 성공 대신 지도옆에 리스트중에 한개를 클릭하면 만드는
//상세보기를 만들기위해서는 리스트가 어느정도 완성되어야함
//의문: 원래 데이터는 10개만 나오나??

const DetailPage: React.FC<DetailPageProps> = ({ open, onClose }) => {
    // Open API 상태 관리
    const { data,isLoading,error } = useQuery<OpenDataResponse >({
        queryKey:["openData"],
        queryFn:getOpenData});
    console.log(data);
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <Drawer open={open} onClose={onClose}>
            <Box
                sx={{ width: 500}}
                role="presentation"
                onClick={onClose}
                onKeyDown={onClose}
            >
                <List>
                    {data?.data.map((item, index) => (
                        <ListItem key={index} disablePadding>
                            <ListItemText
                                primary={`Item ${index + 1}`}
                                secondary={
                                    // 객체의 모든 키와 값을 표시
                                    Object.entries(item).map(([key, value], idx) => (
                                        <div key={idx}>
                                            <strong>{key}:</strong> {String(value)}
                                        </div>
                                    ))
                                }
                            />
                        </ListItem>
                    ))}
                </List>
                <Divider />
            </Box>
        </Drawer>
    );
};

export default DetailPage;
