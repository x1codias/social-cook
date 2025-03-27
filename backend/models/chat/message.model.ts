import { DataTypes, Model } from 'sequelize';
import sequelize from '../../sequelize';
import ChatRoom from './chat-room.model';
import ChatParticipant from './chat-participant.model';

export type MessageType = {
  id?: number;
  participantId: number;
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
    participantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ChatParticipant,
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
