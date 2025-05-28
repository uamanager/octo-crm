import { useInfiniteQuery } from '@tanstack/react-query';
import { useProjectApi } from '../../../api/project.api';

export const useSearchProjectsQuery = (limit = 10) => {
  const projectApi = useProjectApi();

  return useInfiniteQuery({
    queryKey: ['projects'],
    queryFn: ({ pageParam }) => projectApi.searchProjects({ limit, offset: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (
        lastPage.pagination.offset + lastPage.pagination.limit >=
        lastPage.pagination.total
      ) {
        return undefined;
      }
      return lastPage.pagination.offset + lastPage.pagination.limit;
    },
  });
};
