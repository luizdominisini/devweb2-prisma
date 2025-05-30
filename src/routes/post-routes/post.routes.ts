import { Request, Response, Router } from "express";
import { IPostCreateRequest } from "../../interface/post/post.request";
import { PostService } from "../../services/post.service";

const routerPost = Router();
const post_service = new PostService();

routerPost.get("/", (_req: Request, res: Response) => {
  res.json({ message: "Post route is working!!!!!!!!!!" });
});

routerPost.post("/create", async (req: Request, res: Response) => {
  console.log(req.body);
  const postBody: IPostCreateRequest = req.body;
  const postCreated = await post_service.createPost(postBody);

  if (postCreated.error) {
    res.status(postCreated.status).json({
      message: postCreated.message,
      error: postCreated.error,
    });
  }

  res.status(postCreated.status).json({
    message: postCreated.message,
    postCreated: postCreated.postCreated,
  });
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
