import { Prop, Schema } from '@nestjs/mongoose';
import { IGithubRepositoryOwnerEntity, RepositoryOwnerType } from '@octo-crm/core';

@Schema()
export class SourceDataOwner implements IGithubRepositoryOwnerEntity {
  @Prop({ type: String, required: true })
  login!: string;

  @Prop({ type: String, required: true })
  avatar_url!: string;

  @Prop({ type: String, required: true })
  url!: string;

  @Prop({ type: String, enum: RepositoryOwnerType, required: true })
  type!: RepositoryOwnerType;
}
