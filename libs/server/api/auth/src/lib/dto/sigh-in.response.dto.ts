import { IAuthSignInResponseDto, IAuthSignInResponseResultDto } from '@octo-crm/shared';
import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from '@octo-crm/server-core';

export class AuthSignInResponseResultDto implements IAuthSignInResponseResultDto {
  @ApiProperty({
    type: String,
    description: 'Access token',
    example: '<KEY>',
  })
  access_token: string;

  constructor(access_token: string) {
    this.access_token = access_token;
  }
}

export class AuthSignInResponseDto
  extends ResponseDto<AuthSignInResponseResultDto>
  implements IAuthSignInResponseDto
{
  @ApiProperty({
    type: () => AuthSignInResponseResultDto,
    description: 'Result',
  })
  override result!: AuthSignInResponseResultDto;
}
