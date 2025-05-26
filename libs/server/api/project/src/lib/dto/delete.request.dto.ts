import { IdApiProperty, IsId } from '@octo-crm/server-core';
import { IProjectDeleteRequestDtoParams } from '@octo-crm/shared';

export class ProjectDeleteRequestDtoParams  implements IProjectDeleteRequestDtoParams {
  @IdApiProperty('Project', 'projects')
  @IsId()
  id!: string;
}
