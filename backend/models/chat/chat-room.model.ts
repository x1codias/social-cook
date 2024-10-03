import { DataTypes, Model } from 'sequelize';
import sequelize from '../../sequelize';

export enum ChatRoomContext {
  private = 'private',
  group = 'group',
}

export type ChatRoomType = {
  id?: number;
  context: ChatRoomContext;
};

const ChatRoom = sequelize.define<Model<ChatRoomType>>(
  'ChatRoom',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Enable auto-increment for the ID field
    },
    context: {
      type: DataTypes.ENUM(
        ...Object.values(ChatRoomContext)
      ),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    tableName: 'chat_rooms',
    timestamps: true,
  }
);

export default ChatRoom;
