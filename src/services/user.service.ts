import prisma from "../database/prisma-connection";
import { IUserCreateRequest } from "../interface/user/user.request";

export class UserService {
  async createUser({ email, name }: IUserCreateRequest) {
    try {
      const userExist = await prisma.user.findUnique({
        where: { email: email },
      });

      if (userExist) {
        return {
          status: 400,
          message: "User already exists",
        };
      }

      const userCreate = await prisma.user.create({
        data: {
          email: email,
          name: name,
        },
      });

      return {
        message: "User created successfully",
        user: userCreate,
        status: 201,
      };
    } catch (error) {
      return {
        message: "Error creating user",
        status: 500,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  async listUser() {
    try {
      const users = await prisma.user.findMany();

      if (!users || users.length == 0) {
        return {
          message: "No users found",
          status: 404,
          users: [],
        };
      }

      return {
        message: "Users listed successfully",
        users: users,
        status: 200,
      };
    } catch (error) {
      return {
        message: "Error listing users",
        status: 500,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  async updateUser() {}

  async deleteUser() {}
}
