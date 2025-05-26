import { IResponseDto } from '@octo-crm/core';
import { IProjectResponseDto } from './project.response.dto';

export interface IProjectCreateResponseResultDto extends IProjectResponseDto {}

export interface IProjectCreateResponseDto
  extends IResponseDto<IProjectCreateResponseResultDto> {}
