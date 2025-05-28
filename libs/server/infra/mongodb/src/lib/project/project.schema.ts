import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory, Virtual } from '@nestjs/mongoose';
import { EntityRef, IProjectEntity, ISourceEntity, IUserEntity } from '@octo-crm/core';

export type ProjectDocument = HydratedDocument<Project>;

@Schema({
  collection: 'projects',
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class Project<
  TUser extends EntityRef<IUserEntity> = string,
  TSource extends EntityRef<ISourceEntity> = string,
> implements IProjectEntity<TUser, TSource>
{
  @Virtual({
    get: function (this: ProjectDocument) {
      return this._id.toHexString();
    },
  })
  id!: string;

  @Prop({ type: String, required: true })
  key!: string;

  @Prop({ type: String, ref: 'User', required: true, index: true })
  user!: TUser;

  @Prop({ type: String, ref: 'Source', required: true })
  source!: TSource;

  @Prop({ default: Date.now })
  created_at!: Date;

  @Prop({ default: Date.now })
  updated_at!: Date;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);

ProjectSchema.index({ user: 1, key: 1 }, { unique: true });
