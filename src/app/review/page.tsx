'use client'
import  React  from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReviewsList from '../../containers/review/ReviewsList';
const Review: React.FC = () => {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <ReviewsList/>
        </QueryClientProvider>
    )
}

export default Review;