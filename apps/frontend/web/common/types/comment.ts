import { Member } from "./tenant";

export interface Comment {
  id: string;
  content: string;
  userId: string;
  taskId: string;
  createdAt: string;
  user: Member;
}

export interface CommentCreate {
  content: string;
}
