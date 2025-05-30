import prisma from "../database/prisma-connection";
import { IPostCreateRequest } from "../interface/post/post.request";

export class PostService {
  async createPost({ authorId, content, title }: IPostCreateRequest) {
    try {
      const userExist = await prisma.user.findUnique({
        where: { id: authorId },
      });

      if (!userExist) {
        return {
          message: "User not found",
          status: 404,
        };
      }

      const postCreate = await prisma.post.create({
        data: {
          authorId,
          content,
          title,
        },
      });

      return {
        message: "Post created successfully",
        status: 201,
        postCreated: postCreate,
      };
    } catch (error) {
      return {
        message: "Error updating user",
        status: 500,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  async updatePost() {}

  async listPost() {}

  async deletePost() {}
}
