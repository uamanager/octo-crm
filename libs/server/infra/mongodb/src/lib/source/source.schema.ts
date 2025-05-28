import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory, Virtual } from '@nestjs/mongoose';
import { ISourceEntity } from '@octo-crm/core';
import { SourceDataOwner } from './source-owner.schema';
import { SourceDataRepository } from './source-repository.schema';

export type SourceDocument = HydratedDocument<Source>;

@Schema({
  collection: 'sources',
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class Source implements ISourceEntity {
  @Virtual({
    get: function (this: SourceDocument) {
      return this._id.toHexString();
    },
  })
  id!: string;

  @Prop({ type: String, required: true, unique: true, index: true })
  key!: string;

  @Prop({
    type: Object,
    default: null,
  })
  owner!: SourceDataOwner;

  @Prop({
    type: Object,
    default: null,
  })
  repository!: SourceDataRepository;

  @Prop({ default: Date.now })
  created_at!: Date;

  @Prop({ default: Date.now })
  updated_at!: Date;
}

export const SourceSchema = SchemaFactory.createForClass(Source);
