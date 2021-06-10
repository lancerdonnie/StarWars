import type { QueryFunctionContext } from 'react-query';

import { QueryClient } from 'react-query';
import axios from 'axios';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }: QueryFunctionContext) => {
        const { data } = await axios.get(
          (queryKey[0] as string).replace('http:', 'https:')
        );
        return data;
      },
      refetchOnWindowFocus: process.env.NODE_ENV === 'production',
    },
  },
});
