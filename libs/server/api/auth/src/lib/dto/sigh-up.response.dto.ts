import { IAuthSignUpResponseDto } from '@octo-crm/shared';
import { ResponseDto } from '@octo-crm/server-core';

export class AuthSignUpResponseDto
  extends ResponseDto<undefined>
  implements IAuthSignUpResponseDto {}
