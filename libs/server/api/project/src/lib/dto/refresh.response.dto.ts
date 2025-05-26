import { ResponseDto } from '@octo-crm/server-core';
import { IProjectRefreshResponseDto } from '@octo-crm/shared';

export class ProjectRefreshResponseDto
  extends ResponseDto<undefined>
  implements IProjectRefreshResponseDto {}
