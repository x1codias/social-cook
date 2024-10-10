import { Response } from 'express';
import { AuthRequest } from './auth.controller';
import { errorHandler, Errors } from './error.controller';
import {
  createCommentService,
  deleteCommentService,
  editCommentService,
  getCommentService,
  getCommentsService,
} from '../services/comment.service';

const comments = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { recipeId } = req.params;
    const limit = parseInt(req.query.limit as string);
    const offset = parseInt(req.query.offset as string);

    const { comments } = await getCommentsService(
      parseInt(recipeId),
      limit,
      offset
    );

    res.status(200).json({
      comments,
    });
  } catch (err) {
    return errorHandler(500, Errors.serverError, res);
  }
};

const comment = async (req: AuthRequest, res: Response) => {
  try {
    const { commentId } = req.params;
    const limit = parseInt(req.query.limit as string);
    const offset = parseInt(req.query.offset as string);

    const { subCommentsCount, subComments } =
      await getCommentService(
        parseInt(commentId),
        offset,
        limit
      );

    res.status(200).json({
      subCommentsCount,
      subComments,
    });
  } catch (err) {
    return errorHandler(500, Errors.serverError, res);
  }
};

const createComment = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { userId } = req.user;
    const { recipeId } = req.params;
    const { content, parentCommentId } = req.body;

    const { comment } = createCommentService(
      userId,
      parseInt(recipeId),
      content,
      parentCommentId,
      res
    );

    res.status(200).json({
      message: 'commentSuccessfull',
      comment,
    });
  } catch (err) {
    return errorHandler(500, Errors.serverError, res);
  }
};

const editComment = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;

    await editCommentService(
      parseInt(commentId),
      content,
      res
    );

    res.status(200).json({
      message: 'commentUpdatedSuccefully',
    });
  } catch (err) {
    return errorHandler(500, Errors.serverError, res);
  }
};

const deleteComment = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { commentId } = req.params;

    await deleteCommentService(parseInt(commentId));

    res.status(200).json({
      message: 'commentDeleted',
    });
  } catch (err) {
    return errorHandler(500, Errors.serverError, res);
  }
};

export {
  comment,
  comments,
  createComment,
  editComment,
  deleteComment,
};
