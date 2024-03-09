import { PrismaClient } from "@prisma/client";
import { User } from "../types/User";

export const prisma = new PrismaClient();

const createUser = async (userData: User) => {
  const { user_id, email, name, username, password, progress, dob } = userData;

  const isUserExist = await prisma.users.findFirstOrThrow({
    where:{
        email: email,
    }
  })

  console.log(isUserExist)

  const user = await prisma.users.create({
    data: {
      email,
      name,
      password,
      progress,
      user_id,
      username,
      dob,
    },
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
      console.log(err);
    }
  };

const getAllUsers = async () => {
  try {
    const allUsers = await prisma.users.findMany();
    return allUsers;
  } catch (err) {
    console.log(err);
  }
};

export { getAllUsers, createUser, getUser };
