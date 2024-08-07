'use client';
import React, { useEffect, useState } from 'react';
import { getOpenData } from '../../utils/db/open_api';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

interface DetailPageProps {
    open: boolean;
    onClose: () => void;
}

const DetailPage: React.FC<DetailPageProps> = ({ open, onClose }) => {
    // Open API 상태 관리
    const [data, setData] = useState<any[]>([]);

    // Open API 데이터 가져오기
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getOpenData();
                setData(result.data || []);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <Drawer open={open} onClose={onClose}>
            <Box
                sx={{ width: 500}}
                role="presentation"
                onClick={onClose}
                onKeyDown={onClose}
            >
                <List>
                    {data.map((item, index) => (
                        <ListItem key={index} disablePadding>
                            <ListItemText primary={item['건물 번호']} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
            </Box>
        </Drawer>
    );
};

export default DetailPage;
