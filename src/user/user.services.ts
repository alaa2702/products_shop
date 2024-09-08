// Create the user service
import prisma from "../utils/prisma";

export const createUserService = async (username: string, email: string, password: string) => {
  const user = await prisma.user.create({
    data: {
      username,
      email,
      password,
      role: "USER"
    },
  });
  return user;
};

export const createAdminService = async (username: string, email: string, password: string) => {
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password,
        role: "ADMIN"
      },
    });
    return user;
  };

  export const getUserService = async (id: number) => {
    const user = await prisma.user.findUnique({ where: { id } });
    return user;
  }
  export const getUsersService = async () => {
    const users = await prisma.user.findMany();
    return users;
  }
  export const updateUserService = async (id: number, username: string, email: string, password: string) => {
    const user = await prisma.user.update({
      where: { id },
      data: {
        username,
        email,
        password,
      },
    });
    return user;
  }
  export const deleteUserService = async (id: number) => {
    await prisma.user.delete({
      where: { id },
    });
  }
  export const getUserByEmailService = async (email: string) => {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
  }