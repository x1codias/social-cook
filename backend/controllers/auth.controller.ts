import { Secret, sign } from 'jsonwebtoken'
import { compare, hash, genSalt } from 'bcryptjs'
import User, { UserType } from '../models/user.model'
import { Model, Op } from 'sequelize'
import { Response, Request } from 'express'
import { Errors, errorHandler } from './error.controller'

const generateToken = (user: Model<UserType, UserType>) => {
  const token = sign(
    { userId: user.get().id },
    process.env.JWT_KEY as Secret
  )

  user.set('token', token)
  return token
}

const register = async (req: Request, res: Response) => {
  const { username, email, password, biography, photo } =
    req.body as UserType

  const user = await User.findOne({
    where: {
      [Op.or]: [{ email: email }, { username: username }],
    },
  })

  if (user) {
    return errorHandler(409, Errors.userExists, res)
  }

  const salt = await genSalt()

  const encryptedPassword = await hash(password, salt)

  const newUser = await User.create({
    username,
    email,
    password: encryptedPassword,
    biography,
    photo,
  })

  const token = generateToken(newUser)
  newUser.save()

  res.json({
    user: newUser,
    severity: 'success',
    message: 'welcomeChef',
  })
}

const login = async (req: Request, res: Response) => {
  const { identifier, password } = req.body as {
    identifier: string
    password: string
  }

  const user = await User.findOne({
    where: {
      [Op.or]: [
        { email: identifier },
        { username: identifier },
      ],
    },
  })

  if (!user)
    return errorHandler(401, Errors.emailPassword, res)

  const isValidPassword = await compare(
    password,
    user.get().password
  )

  if (!isValidPassword)
    return errorHandler(401, Errors.emailPassword, res)

  const token = generateToken(user)
  await user.save()

  res.json({
    user,
    severity: 'success',
    message: 'welcomeBackChef',
  })
}

const logout = async (req: Request, res: Response) => {
  const { id } = req.body as {
    id: number
  }

  const user = await User.findOne({
    where: { id },
  })

  if (!user) {
    return errorHandler(401, Errors.userNotFound, res)
  }

  user.set('token', null)
  await user.save()

  res.json({
    severity: 'success',
    message: 'hopeToSeeAgainChef',
  })
}

export { register, login, logout }
