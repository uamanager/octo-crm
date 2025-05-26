import { ProjectResponseDto } from './project.response.dto';
import { IProjectCreateResponseResultDto } from '@octo-crm/shared';
import { ResponseDto } from '@octo-crm/server-core';
import { ApiProperty } from '@nestjs/swagger';

export class ProjectCreateResponseResultDto
  extends ProjectResponseDto
  implements IProjectCreateResponseResultDto {}

export class ProjectCreateResponseDto
  extends ResponseDto<ProjectCreateResponseResultDto>
  implements ProjectCreateResponseDto
{
  @ApiProperty({
    type: () => ProjectCreateResponseResultDto,
    description: 'Result',
  })
  override result!: ProjectCreateResponseResultDto;
}
