import { PrismaClient } from "@prisma/client";
import { User } from "../types/User";
import { logger } from "../utils/logger";

export const prisma = new PrismaClient();

const createUser = async (userData: User) => {
  const { user_id, email, name, username, password, progress, dob } = userData;

  const isUserExist = await prisma.users.findUnique({
    where:{
        email: email,
    }
  })

  const user = await prisma.users.create({
    data: {
      email,
      name,
      password,
      progress,
      user_id,
      username,
      dob,
      new_user: isUserExist ? false : true
    },
  });
  return user;
};

const updateUser = async (userData: any) => {
  const {  email, name, dob } = userData;

  const user = await prisma.users.update({
    where:{
      email: email,
    },
    data: { ...userData }
  });
  return user;
};

const getUser = async (userId: string) => {
    try {
      const user = await prisma.users.findFirstOrThrow({
        where: {
          user_id: userId,
        },
      });
      return user;
    } catch (err) {
      logger.error(err);
    }
  };

const getAllUsers = async () => {
  try {
    const allUsers = await prisma.users.findMany();
    return allUsers;
  } catch (err) {
    logger.error(err);
  }
};

export { getAllUsers, createUser, getUser, updateUser };
