import { Prop, Schema } from '@nestjs/mongoose';
import { IGithubRepositoryRepositoryEntity } from '@octo-crm/core';

@Schema()
export class SourceDataRepository implements IGithubRepositoryRepositoryEntity {
  @Prop({ type: String, required: true })
  name!: string;

  @Prop({ type: String, required: true })
  description!: string;

  @Prop({ type: [{ type: String }], default: [], required: true })
  topics!: string[];

  @Prop({ type: String, required: true })
  license!: string;

  @Prop({ type: Boolean, required: true })
  private!: boolean;

  @Prop({ type: Boolean, required: true })
  template!: boolean;

  @Prop({ type: Boolean, required: true })
  archived!: boolean;

  @Prop({ type: Boolean, required: true })
  fork!: boolean;

  @Prop({ type: String, required: true })
  url!: string;

  @Prop({ type: Number, required: true })
  stars!: number;

  @Prop({ type: Number, required: true })
  forks!: number;

  @Prop({ type: Number, required: true })
  issues!: number;

  @Prop({ type: Number, required: true })
  watchers!: number;

  @Prop({ type: Date, required: true })
  created_at!: Date;

  @Prop({ type: Date, required: true })
  updated_at!: Date;

  @Prop({ type: Date, required: true })
  pushed_at!: Date;
}
