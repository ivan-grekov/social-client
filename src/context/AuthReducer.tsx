import { IComment, IPost, IUser } from '../static/types';
// type AvailableActions =
//   | LoginStartAction
//   | LoginSuccessAction
//   | LoginFailureAction
//   | FollowAction
//   | UnfollowAction;

// type Action<T, P> = { type: T } & P;

// type LoginStartAction = Action<'LOGIN_START', {}>;
// type LoginSuccessAction = Action<'LOGIN_SUCCESS', {}>;
// type LoginFailureAction = Action<'LOGIN_FAILURE', {}>;
// type FollowAction = Action<'FOLLOW', {}>;
// type UnfollowAction = Action<'UNFOLLOW', {}>;

export const AuthReducer = (
  state: {
    user: IUser;
    post: IPost;
    isCreatePost: boolean;
    isFetching: boolean;
    error: boolean;
    query: string;
    comments: IComment[];
  },
  action: any
) => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        user: null,
        isFetching: true,
        error: false,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        isFetching: false,
        error: true,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isFetching: false,
        error: false,
      };
    case 'SET_QUERY':
      return {
        ...state,
        query: action.payload,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case 'FOLLOW':
      return {
        ...state,
        user: {
          ...state.user,
          followings: [...state.user.followings, action.payload],
        },
      };
    case 'UNFOLLOW':
      return {
        ...state,
        user: {
          ...state.user,
          followings: state.user.followings.filter(
            (following: string) => following !== action.payload
          ),
        },
      };
    case 'START_UPDATE_POST':
      return {
        ...state,
        post: null,
        isFetching: true,
      };
    case 'UPDATE_POST':
      return {
        ...state,
        isFetching: false,
        post: action.payload,
      };
    case 'CREATE_POST':
      return {
        ...state,
        isCreatePost: action.payload,
        isFetching: false,
      };
    case 'SET_COMMENTS':
      return {
        ...state,
        comments: action.payload,
      };
    case 'ADD_COMMENT':
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };
    default:
      return state;
  }
};
