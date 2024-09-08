//Create the user controller
import e, { Request, Response } from "express";
import { createAdminService, createUserService, updateUserService, getUserByEmailService, getUserService,getUsersService,deleteUserService } from "./user.services";
import { hashPassword, passwordValid } from "../utils/password";
import { userRegisterSchema, userLoginSchema } from "../validation/UserSchema";
import { createToken } from "../utils/createToken";

export const createUserController = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const validPayload = userRegisterSchema.parse({username, email, password});
  const hashedPassword = await hashPassword(password);
  const user = await createUserService(username, email, hashedPassword);
  res.status(201).json({ user, message: "user created succesfully" });
};

export const loginUserController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const validPayload = userLoginSchema.parse({email, password});
  const user = await getUserByEmailService(email);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const validPassword = await passwordValid(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  
  const token = createToken(user.id, user.role);
  res.status(200).json({ token, message: "user logged in succesfully" });
}

export const updateUserController = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const validPayload = userRegisterSchema.parse({name, email, password});
  const hashedPassword = await hashPassword(password);
  const user = await updateUserService(parseInt((req as any).user.id), name, email, hashedPassword);
  res.status(200).json({ user, message: "user updated succesfully" });
}
export const getUserController = async (req: Request, res: Response) => {
  const user = await getUserService(parseInt((req as any).user.id));
  res.status(200).json(user);
}

export const deleteUserController = async (req: Request, res: Response) => {
  await deleteUserService(parseInt((req as any).user.id));
  res.status(200).json({ message: "user deleted succesfully" });
}
export const createAdminController = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const validPayload = userRegisterSchema.parse({name, email, password});
  const hashedPassword = await hashPassword(password);
  const user = await createAdminService(name, email, hashedPassword);
  
  res.status(201).json({ user, message: "Admin created succesfully" });
}
export const getUserByAdminController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await getUserService(parseInt(id));
  res.status(200).json(user);

}
export const getUsersByAdminController = async (req: Request, res: Response) => {
  
  const users = await getUsersService();
  res.status(200).json(users);
}
export const updateUserByAdminController = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const validPayload = userRegisterSchema.parse({name, email, password});
  const hashedPassword = await hashPassword(password);
  const user = await updateUserService(parseInt(req.params.id), name, email, hashedPassword);
  res.status(200).json({ user, message: "user updated succesfully" });
}
export const deleteUserByAdminController = async (req: Request, res: Response) => {
  await deleteUserService(parseInt(req.params.id));
  res.status(200).json({ message: "user deleted succesfully" });
}
