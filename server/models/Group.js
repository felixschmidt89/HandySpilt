import { Schema, model } from 'mongoose';

const groupSchema = new Schema(
  {
    groupCode: {
      type: String,
      required: true,
    },
    groupName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Group = model('Group', groupSchema);

export default Group;
