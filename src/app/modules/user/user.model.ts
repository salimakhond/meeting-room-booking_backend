import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';
import validator from 'validator';
import config from '../../config';
import bcrypt from 'bcrypt';

const userSchema = new Schema<TUser>({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: '{VALUE} is not valid email',
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    select: 0,
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    required: [true, 'Roll is required'],
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
  },
});

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_round)
  );
  next();
});
//remove user from response
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const User = model<TUser>('User', userSchema);
