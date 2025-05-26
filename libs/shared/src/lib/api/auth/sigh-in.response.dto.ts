import { IResponseDto } from '@octo-crm/core';

export interface IAuthSignInResponseResultDto {
  access_token: string;
}

export interface IAuthSignInResponseDto
  extends IResponseDto<IAuthSignInResponseResultDto> {}
