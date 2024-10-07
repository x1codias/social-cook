import { NotificationContext } from '../models/notification.model';

export const generateNotificationMessage = (
  context: NotificationContext
) => {
  switch (context) {
    case NotificationContext.comment:
      return 'newComment';
    case NotificationContext.commentLike:
      return 'newCommentLike';
    case NotificationContext.follow:
      return 'newFollower';
    case NotificationContext.mention:
      return 'someoneMentionedYou';
    case NotificationContext.rating:
      return 'someoneRatedRecipe';
    case NotificationContext.favorite:
      return 'someoneAddedRecipeToFavorite';
    default:
      return 'newNotification';
  }
};
