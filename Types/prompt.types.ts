import { IUser } from "./user.types";

export interface IPost {
  _id: string;
  prompt: string;
  creator: IUser;
  tags: string;
}

export type ICreatePost = Omit<IPost, "_id" | "creator">;
export type IUpdatePost = Partial<Omit<IPost, "creator">>;