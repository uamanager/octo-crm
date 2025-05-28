import { useMutation } from '@tanstack/react-query';
import { useNotification } from '../../notification/use-notification';
import { useProjectApi } from '../../../api/project.api';
import { queryClient } from '../../../common/query/query';

export const useCreateProjectMutation = () => {
  const projectApi = useProjectApi();
  const notification = useNotification();

  return useMutation({
    mutationFn: projectApi.createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      notification.success('Success!', 'Project created successfully');
    },
    onError: (err) => {
      console.error('useCreateProjectMutation', err);
      notification.error('Error!', err.message);
    },
  });
};
