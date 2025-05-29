import { Request, Response, Router } from "express";
import { IUserCreateRequest } from "../../interface/user/user.request";
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

routerUser.put("/update", (_req: Request, _res: Response) => {
  return user_service.updateUser();
});

routerUser.delete("/delete", (_req: Request, _res: Response) => {
  return user_service.deleteUser();
});

export default routerUser;
