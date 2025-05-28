import {
  IAuthSignInRequestDtoBody,
  IAuthSignInResponseDto,
  IAuthSignUpRequestDtoBody,
  IAuthSignUpResponseDto,
} from '@octo-crm/shared';
import { AxiosClient } from '../common/axios/use-axios';

export const useAuthApi = () => {
  const signIn = async (body: IAuthSignInRequestDtoBody) => {
    return AxiosClient.post<IAuthSignInResponseDto>('/v1/auth/sign-in', body).then(
      (res) => res.data,
    );
  };

  const signUp = async (body: IAuthSignUpRequestDtoBody) => {
    return AxiosClient.post<IAuthSignUpResponseDto>('/v1/auth/sign-up', body).then(
      (res) => res.data,
    );
  };

  return {
    signIn,
    signUp,
  };
};
