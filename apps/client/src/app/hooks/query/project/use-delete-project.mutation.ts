import { useMutation } from '@tanstack/react-query';
import { useNotification } from '../../notification/use-notification';
import { useProjectApi } from '../../../api/project.api';
import { queryClient } from '../../../common/query/query';

export const useDeleteProjectMutation = () => {
  const projectApi = useProjectApi();
  const notification = useNotification();

  return useMutation({
    mutationFn: projectApi.deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      notification.success('Success!', 'Project deleted successfully');
    },
    onError: (err) => {
      console.error('useDeleteProjectMutation', err);
      notification.error('Error!', err.message);
    },
  });
};
