import { IUser } from "./user.types";

export interface IPost {
  _id: string;
  prompt: string;
  creator: IUser;
  tag: string;
}

export interface ICreatePost extends Omit<IPost, "_id" | "creator"> {}
export interface IUpdatePost extends Partial<Omit<IPost, "creator">> {}
