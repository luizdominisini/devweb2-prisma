import { Request, Response, Router } from "express";
import { PostService } from "../../services/post.service";

const routerPost = Router();
const post_service = new PostService();

routerPost.get("/", (_req: Request, res: Response) => {
  res.json({ message: "Post route is working!" });
});

routerPost.post("/create", (_req: Request, _res: Response) => {
  return post_service.createPost();
});

routerPost.put("/update", (_req: Request, _res: Response) => {
  return post_service.updatePost();
});

routerPost.get("/list", (_req: Request, _res: Response) => {
  return post_service.listPost();
});

routerPost.delete("/delete", (_req: Request, _res: Response) => {
  return post_service.deletePost();
});

export default routerPost;
