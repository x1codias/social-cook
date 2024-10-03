import { DataTypes, Model } from 'sequelize';
import sequelize from '../../sequelize';
import User from '../user.model';
import ChatRoom from './chat-room.model';

export type MessageType = {
  id?: number;
  userId: number;
  chatRoomId: number;
  content: string;
};

const Message = sequelize.define<Model<MessageType>>(
  'Message',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Enable auto-increment for the ID field
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    chatRoomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ChatRoom,
        key: 'id',
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    tableName: 'messages',
    timestamps: true,
  }
);

export default Message;
