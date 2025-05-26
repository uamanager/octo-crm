import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory, Virtual } from '@nestjs/mongoose';
import { IUserEntity } from '@octo-crm/core';

export type UserDocument = HydratedDocument<User>;

@Schema({
  collection: 'users',
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class User implements IUserEntity {
  @Virtual({
    get: function (this: UserDocument) {
      return this._id.toHexString();
    },
  })
  id!: string;

  @Prop({ required: true, index: true, unique: true })
  email!: string;

  @Prop({ required: true })
  password!: string;

  @Prop({ default: Date.now })
  created_at!: Date;

  @Prop({ default: Date.now })
  updated_at!: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
