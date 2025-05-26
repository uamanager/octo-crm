import { IResponseListDto } from '@octo-crm/core';
import { IProjectResponseDto } from './project.response.dto';

export interface IProjectSearchResponseResultDto extends IProjectResponseDto {}

export interface IProjectSearchResponseDto
  extends IResponseListDto<IProjectSearchResponseResultDto[]> {}
