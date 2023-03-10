export interface UserProps {
  user: IUser;
}

export interface IPost {
  _id: string;
  userId: string;
  desc?: string;
  tags?: string;
  img: string;
  likes: string[];
  createdAt: string;
}

export interface IUpdatedPost {
  _id: string;
  userId: string;
  desc?: string;
  img: string;
}

export interface PostProps {
  post: IPost;
}

export interface propsFormAuth {
  title: string;
  isLogin: boolean;
}

export interface propsMenuPost {
  post: IPost;
}

export interface IUser {
  _id: string;
  username: string;
  email: string;
  password?: string;
  profilePicture?: string;
  coverPicture?: string;
  followers: string[];
  followings: string[];
  isAdmin: boolean;
  desc?: string;
  city?: string;
  from?: string;
  relationship?: number;
  birthday?: string;
}

export interface FeedProps {
  username?: string;
}

export interface IFriend {
  _id: string;
  username: string;
  profilePicture: string;
  birthday: string;
}

export interface UserContext {
  user: IUser | null;
  post: IPost | null;
  isCreatePost: boolean;
  isFetching: boolean;
  error: boolean;
  query: string;
  comments: IComment[];
  dispatch: any;
}

export interface RightbarProps {
  user?: IUser | null;
}

export interface TagsProps {
  tags: string[];
}

export interface IConversation {
  members: string[];
  _id: string;
}

export interface ConversationProps {
  conversation: IConversation;
  currentUser: IUser | null;
}

export interface IMessage {
  conversationId?: string;
  sender: string;
  text: string;
  _id?: string;
  createdAt: string;
}

export interface IArrivalMessage {
  sender: string;
  text: string;
  createdAt: string;
}

export interface IUpdateUser {
  userId?: string;
  username?: string;
  email?: string;
  password?: string;
  profilePicture?: string;
  coverPicture?: string;
  desc?: string;
  city?: string;
  from?: string;
  relationship?: number;
}

export interface IComment {
  _id: string;
  userId: string;
  userImg: string;
  postId: string;
  username: string;
  desc: string;
  createdAt: string;
}

export interface IEvent {
  day: number;
  id: number;
  description: string;
  label: string;
  title: string;
}

export interface ILabel {
  label: string;
  checked: boolean;
}
