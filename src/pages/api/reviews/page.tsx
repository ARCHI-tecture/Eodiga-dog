import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReviewsList from "../../../containers/review/ReviewsList";

const queryClient = new QueryClient();

export default function ReviewsPage() {
    return (
        <QueryClientProvider client={queryClient}>
            <div>
                <ReviewsList />
            </div>
        </QueryClientProvider>
    );
}
