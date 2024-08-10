import Bookmark from "../../containers/bookmark/bookmark";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const bookmark = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <div>
                <Bookmark />
            </div>
        </QueryClientProvider>

    );
}

export default bookmark;