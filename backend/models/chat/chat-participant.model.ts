import { DataTypes, Model } from 'sequelize';
import sequelize from '../../sequelize';
import ChatRoom from './chat-room.model';
import User from '../user.model';

export enum ChatParticipantRole {
  admin = 'admin',
  member = 'member',
}

export type ChatParticipantType = {
  id?: number;
  userId: number;
  chatRoomId: number;
  role: ChatParticipantRole;
};

const ChatParticipant = sequelize.define<
  Model<ChatParticipantType>
>(
  'ChatParticipant',
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
    role: {
      type: DataTypes.ENUM(
        ...Object.values(ChatParticipantRole)
      ),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    tableName: 'chat_participants',
    timestamps: true,
  }
);

export default ChatParticipant;
