import { useMutation } from '@tanstack/react-query';
import { useNotification } from '../../notification/use-notification';
import { useAuthApi } from '../../../api/auth.api';

export const useSignUpMutation = () => {
  const authApi = useAuthApi();
  const notification = useNotification();

  return useMutation({
    mutationFn: authApi.signUp,
    onSuccess: () => {
      notification.success('Success', 'You have successfully signed in');
    },
    onError: (err) => {
      console.error('useSignUpMutation', err);
      notification.error('Error!', err.message ?? 'Failed to sign up');
    },
  });
};
