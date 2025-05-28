import { useMutation } from '@tanstack/react-query';
import { useNotification } from '../../notification/use-notification';
import { useProjectApi } from '../../../api/project.api';
import { queryClient } from '../../../common/query/query';

export const useRefreshProjectMutation = () => {
  const projectApi = useProjectApi();
  const notification = useNotification();

  return useMutation({
    mutationFn: projectApi.refreshProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      notification.success('Success!', 'Project refreshed successfully');
    },
    onError: (err) => {
      console.error('useRefreshProjectMutation', err);
      notification.error('Error!', err.message);
    },
  });
};
