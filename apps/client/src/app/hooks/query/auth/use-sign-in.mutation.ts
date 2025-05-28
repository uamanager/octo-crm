import { useMutation } from '@tanstack/react-query';
import { useNotification } from '../../notification/use-notification';
import { useAuth } from '../../../context/auth.context';
import { useAuthApi } from '../../../api/auth.api';
import { queryClient } from '../../../common/query/query';

export const useSignInMutation = () => {
  const authApi = useAuthApi();
  const notification = useNotification();
  const { login } = useAuth();

  return useMutation({
    mutationFn: authApi.signIn,
    onSuccess: (res) => {
      queryClient.clear();
      login(res.result.access_token);
      notification.success('Success!', 'You have successfully signed in');
    },
    onError: (err) => {
      console.error('useSignInMutation', err);
      notification.error('Error!', err.message ?? 'Failed to sign in');
    },
  });
};
