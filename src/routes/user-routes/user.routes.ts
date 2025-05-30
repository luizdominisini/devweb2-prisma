import { Request, Response, Router } from "express";
import {
  IUserCreateRequest,
  IUserUpdateRequest,
} from "../../interface/user/user.request";
import { UserService } from "../../services/user.service";

const routerUser = Router();
const user_service = new UserService();

routerUser.get("/", (_req: Request, res: Response) => {
  res.json({ message: "User route is working!" });
});

routerUser.post("/create", async (req: Request, res: Response) => {
  const userBody: IUserCreateRequest = req.body;
  const userCreated = await user_service.createUser(userBody);

  if (userCreated.error) {
    res.status(userCreated.status).json({
      message: userCreated.message,
      error: userCreated.error,
    });
  }

  res.status(userCreated.status).json({
    message: userCreated.message,
    userCreated: userCreated.user,
  });
});

routerUser.get("/list", async (_req: Request, res: Response) => {
  const users = await user_service.listUser();

  if (users.error) {
    res.status(users.status).json({
      message: users.message,
      error: users.error,
    });
  }

  res.status(users.status).json({
    message: users.message,
    users: users.users,
  });
});

routerUser.put("/update/:id", async (req: Request, res: Response) => {
  const userBody: IUserUpdateRequest = req.body;
  const userUpdated = await user_service.updateUser(req.params.id, userBody);

  if (userUpdated.error) {
    res.status(userUpdated.status).json({
      message: userUpdated.message,
      error: userUpdated.error,
    });
  }

  res.status(userUpdated.status).json({
    message: userUpdated.message,
    userUpdated: userUpdated.userUpdated,
  });
});

routerUser.delete("/delete/:id", async (req: Request, res: Response) => {
  const userDeleted = await user_service.deleteUser(req.params.id);
  if (userDeleted.error) {
    res.status(userDeleted.status).json({
      message: userDeleted.message,
      error: userDeleted.error,
    });
  }

  res.status(userDeleted.status).json({
    message: userDeleted.message,
    userDeleted: userDeleted.deletedUser,
  });
});

export default routerUser;
