import User from './user.model';
import Token from './token.model';
import Recipe from './recipe.model';
import Ingredient from './ingredient.model';
import Unit from './unit.model';
import RecipeIngredient from './recipe-ingedient.model';
import Preperation from './preperation.model';
import SearchHistory from './search-history.model';
import Favorite from './favorite.model';
import Rating from './rating.model';
import Followage from './followage.model';
import Blockage from './blockage.model';
import Comment from './comment.model';
import ChatRoom from './chat/chat-room.model';
import ChatParticipant from './chat/chat-participant.model';
import Message from './chat/message.model';
import Notification from './notification.model';
import NotificationSetting from './notification-setting.model';
import Setting from './setting.model';

// User with tokens relations
User.hasOne(Token, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});
Token.belongsTo(User, { foreignKey: 'userId' });

// Recipe with Ingredients relations
Recipe.belongsToMany(Ingredient, {
  through: RecipeIngredient,
  foreignKey: 'recipeId',
  onDelete: 'CASCADE',
});
Ingredient.belongsToMany(Recipe, {
  through: RecipeIngredient,
  foreignKey: 'ingredientId',
  onDelete: 'CASCADE',
});

// Unit with RecipeIngredient relations
Unit.hasMany(RecipeIngredient, {
  foreignKey: 'unitId',
  onDelete: 'CASCADE',
});
RecipeIngredient.belongsTo(Unit, { foreignKey: 'unitId' });

// User with Recipes relations
User.hasMany(Recipe, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});
Recipe.belongsTo(User, { foreignKey: 'userId' });

// Recipe with Preperations relations
Recipe.hasOne(Preperation, {
  foreignKey: 'recipeId',
  onDelete: 'CASCADE',
});
Preperation.belongsTo(Recipe, { foreignKey: 'recipeId' });

// User with SearchHistory relations
User.hasMany(SearchHistory, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});
SearchHistory.belongsTo(User, { foreignKey: 'userId' });

// User and Recipe with favorites
User.belongsToMany(Recipe, {
  through: Favorite,
  as: 'favorites',
  foreignKey: 'userId',
});
Recipe.belongsToMany(User, {
  through: Favorite,
  as: 'favoritedBy',
  foreignKey: 'recipeId',
});

// User and Recipe with Rating relations
User.hasMany(Rating, {
  foreignKey: 'userId',
  as: 'ratings',
});
Recipe.hasMany(Rating, {
  foreignKey: 'recipeId',
  as: 'ratings',
});

// User with User regarding Followage
User.belongsToMany(User, {
  through: Followage,
  as: 'followers',
  foreignKey: 'userId',
  otherKey: 'followerId',
  onDelete: 'CASCADE',
});
User.belongsToMany(User, {
  through: Followage,
  as: 'following',
  foreignKey: 'followerId',
  otherKey: 'userId',
  onDelete: 'CASCADE',
});

// User with User regarding Blockage
User.belongsToMany(User, {
  through: Blockage,
  as: 'blockedUsers',
  foreignKey: 'userId',
  otherKey: 'blockedUserId',
  onDelete: 'CASCADE',
});
User.belongsToMany(User, {
  through: Blockage,
  as: 'blockedBy',
  foreignKey: 'blockedUserId',
  otherKey: 'userId',
  onDelete: 'CASCADE',
});

// User with Comment relation
User.hasMany(Comment, {
  foreignKey: 'userId',
  as: 'comments',
  onDelete: 'CASCADE',
});
Comment.belongsTo(User, {
  foreignKey: 'userId',
});

// Recipe with Comment relation
Recipe.hasMany(Comment, {
  foreignKey: 'recipeId',
  as: 'comments',
  onDelete: 'CASCADE',
});
Comment.belongsTo(Recipe, {
  foreignKey: 'recipeId',
  onDelete: 'CASCADE',
});

// User with Chatroom relation
User.hasMany(ChatRoom, {
  foreignKey: 'userId',
  as: 'chatRooms',
  onDelete: 'CASCADE',
});
ChatRoom.belongsTo(User, {
  foreignKey: 'userId',
});

// User with Notification relation
User.hasMany(Notification, {
  foreignKey: 'userId',
  as: 'notifications',
  onDelete: 'CASCADE',
});
Notification.belongsTo(User, {
  foreignKey: 'userId',
});

// User with Setting relation
User.hasOne(Setting, {
  foreignKey: 'userId',
  as: 'settings',
  onDelete: 'CASCADE',
});
Setting.belongsTo(User, {
  foreignKey: 'userId',
});

// User with NotificationSetting relation
User.hasOne(NotificationSetting, {
  foreignKey: 'userId',
  as: 'notificationSettings',
  onDelete: 'CASCADE',
});
NotificationSetting.belongsTo(User, {
  foreignKey: 'userId',
});

// User with ChatParticipant relation
User.hasMany(ChatParticipant, {
  foreignKey: 'userId',
  as: 'chatParticipants',
  onDelete: 'CASCADE',
});
ChatParticipant.belongsTo(User, {
  foreignKey: 'userId',
});

// ChatRoom with ChatParticipant relation
ChatRoom.hasMany(ChatParticipant, {
  foreignKey: 'chatRoomId',
  as: 'chatParticipants',
  onDelete: 'CASCADE',
});
ChatParticipant.belongsTo(ChatRoom, {
  foreignKey: 'chatRoomId',
});

// User with Message relation
ChatParticipant.hasMany(Message, {
  foreignKey: 'participantId',
  as: 'messages',
  onDelete: 'CASCADE',
});
Message.belongsTo(ChatParticipant, {
  foreignKey: 'participantId',
});

// ChatRoom with Message relation
ChatRoom.hasMany(Message, {
  foreignKey: 'chatRoomId',
  as: 'messages',
  onDelete: 'CASCADE',
});
Message.belongsTo(ChatRoom, {
  foreignKey: 'chatRoomId',
});
