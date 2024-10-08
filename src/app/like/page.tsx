'use client'
import Bookmark from "../../containers/bookmark/bookmark";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const Like = () => {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <Bookmark/>
        </QueryClientProvider>
    )
};

export default Like;
