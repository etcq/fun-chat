enum typeOfRequest {
  ERROR = 'ERROR',
  USER_LOGIN = 'USER_LOGIN',
  USER_LOGOUT = 'USER_LOGOUT',
  USER_ACTIVE = 'USER_ACTIVE',
  USER_INACTIVE = 'USER_INACTIVE',
  USER_EXTERNAL_LOGIN = 'USER_EXTERNAL_LOGIN',
  USER_EXTERNAL_LOGOUT = 'USER_EXTERNAL_LOGOUT',
  MSG_FROM_USER = 'MSG_FROM_USER',
  MSG_SEND = 'MSG_SEND',
  MSG_DELIVER = 'MSG_DELIVER',
  MSG_READ = 'MSG_READ',
  MSG_DELETE = 'MSG_DELETE',
  MSG_EDIT = 'MSG_EDIT',
}

enum logErrorType {
  THIS_LOGIN_ALREADY_AUTHORIZED = 'a user with this login is already authorized',
  ANOTHER_USER_IN_THIS_CONNECTION = 'another user is already authorized in this connection',
  INCORRECT_PASSWORD = 'incorrect password',
  NO_USER = 'there is no user with this login',
  USER_NOT_AUTHORIZED = 'the user was not authorized',
}

type ResponseData = {
  id: string | null;
  type: typeOfRequest;
  payload: {
    message?: MessageData;
    messages?: MessageData[];
    error?: logErrorType;
    user?: UserData;
    users?: UserData[];
  };
};

type MessageData = {
  id: string;
  from: string;
  to: string;
  text: string;
  datetime: number;
  status: {
    isDelivered: boolean;
    isReaded: boolean;
    isEdited: boolean;
    isDeleted?: boolean;
  };
};

type UserData = {
  login: string;
  password?: string;
  isLogined?: boolean;
};

type SessionData = {
  isLoggedIn: boolean;
  user: UserData;
};

type Callback = (payload: ResponseData) => void;

type Subscriptions = {
  type: typeOfRequest;
  callback: Callback;
}[];

export {
  type UserData,
  type ResponseData,
  type SessionData,
  typeOfRequest,
  type Subscriptions,
  type Callback,
  type MessageData,
  logErrorType,
};
