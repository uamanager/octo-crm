import { ResponseDto } from '@octo-crm/server-core';
import { IProjectDeleteResponseDto } from '@octo-crm/shared';

export class ProjectDeleteResponseDto
  extends ResponseDto<undefined>
  implements IProjectDeleteResponseDto {}
