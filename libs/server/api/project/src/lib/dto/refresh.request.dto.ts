import { IdApiProperty, IsId } from '@octo-crm/server-core';
import { IProjectRefreshRequestDtoParams } from '@octo-crm/shared';

export class ProjectRefreshRequestDtoParams implements IProjectRefreshRequestDtoParams {
  @IdApiProperty('Project', 'projects')
  @IsId()
  id!: string;
}
