// create the user router
import Express from "express";
import { createUserController, loginUserController, updateUserController, deleteUserController, getUserController } from "./user.controller";
import { createAdminController, getUserByAdminController,updateUserByAdminController,deleteUserByAdminController,getUsersByAdminController } from "./user.controller";
import { authenticateToken } from "../utils/authenticateToken";
import { authorizeRole } from "../utils/authorizationRole";

export const userRouter = Express.Router();
userRouter.post("/user/create", createUserController);
userRouter.post("/user/login", loginUserController);
userRouter.patch("/user/update", authenticateToken, updateUserController);
userRouter.delete("/user/delete", authenticateToken, deleteUserController);
userRouter.get("/user", authenticateToken, getUserController);
userRouter.post("/admin/create", authenticateToken, authorizeRole("ADMIN"), createAdminController);
userRouter.get("/admin/:id", authenticateToken, authorizeRole("ADMIN"), getUserByAdminController);
userRouter.patch("/admin/update", authenticateToken, authorizeRole("ADMIN"), updateUserByAdminController);
userRouter.delete("/admin/delete", authenticateToken, authorizeRole("ADMIN"), deleteUserByAdminController);
userRouter.get("/admin/users", authenticateToken, authorizeRole("ADMIN"), getUsersByAdminController);


