import { Op } from 'sequelize';
import Comment from '../models/comment.model';
import User from '../models/user.model';
import Recipe from '../models/recipe.model';
import {
  errorHandler,
  Errors,
} from '../controllers/error.controller';
import { createNotification } from './notification.service';
import { NotificationContext } from '../models/notification.model';
import { Response } from 'express';

const getCommentService = async (
  commentId: number,
  offset: number,
  limit: number
) => {
  const { count, rows } = await Comment.findAndCountAll({
    offset,
    limit,
    where: {
      parentCommentId: commentId,
    },
  });

  return {
    subCommentsCount: count,
    subComments: rows.map(row => row.get()),
  };
};

const getCommentsService = async (
  recipeId: number,
  limit: number,
  offset: number
) => {
  const { count, rows } = await Comment.findAndCountAll({
    offset,
    limit,
    where: {
      recipeId,
    },
  });

  const userIds = rows.map(
    row => row.get().userId
  ) as number[];

  const usersData = await User.findAll({
    where: {
      id: {
        [Op.in]: userIds,
      },
    },
  });

  const formattedComments = rows.map((row, index) => ({
    id: row.get().id,
    parentCommentId: row.get().parentCommentId,
    content: row.get().content,
    user: {
      id: usersData[index].get().id,
      username: usersData[index].get().username,
      photo: usersData[index].get().photo,
    },
  }));

  return { comments: formattedComments };
};

const createCommentService = async (
  userId: number,
  recipeId: number,
  content: string,
  parentCommentId: number,
  res: Response
) => {
  const newComment = await Comment.create({
    userId,
    recipeId,
    content,
    parentCommentId,
  });

  const targetRecipe = await Recipe.findByPk(recipeId);

  if (!targetRecipe) {
    return errorHandler(404, Errors.recipeDoesntExist, res);
  }

  await createNotification(
    targetRecipe.get().userId,
    userId,
    NotificationContext.comment
  );

  return {
    comment: newComment.get(),
  };
};

const editCommentService = async (
  commentId: number,
  content: string,
  res: Response
) => {
  const commentToEdit = await Comment.findByPk(commentId);

  if (!commentToEdit) {
    return errorHandler(404, Errors.recipeDoesntExist, res);
  }

  commentToEdit?.update({ content });

  commentToEdit?.save();
};

const deleteCommentService = async (commentId: number) => {
  await Comment.destroy({
    where: {
      id: commentId,
    },
  });
};

export {
  getCommentService,
  getCommentsService,
  createCommentService,
  editCommentService,
  deleteCommentService,
};
