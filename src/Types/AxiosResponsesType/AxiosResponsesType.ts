type UsersData = {
  _id: string;
  username: string;
  email: string;
  created_At: Date;
  updated_At: Date;
  courses: any;
};

type CommentsData = {
  _id: string;
  commenter: any;
  body: string;
  course: any;
  created_At: Date;
  updated_At: Date;
};

type TicketsData = {
  created_At: Date;
  updated_At: Date;
  code: string;
  _id: string;
  course: any;
  quantity: number;
};

type BannedUsersData = {
  created_At: Date;
  email: string;
  user: any;
  _id: string;
};

type CoursesData = {
  _id: string;
  duration: string;
  price: number;
  offer: number;
  name: string;
  teacher: string;
  cover: string;
  comments: any;
  created_At: Date;
  updated_At: Date;
};

type GetAllUserResponsesType = {
  data: {
    result: [UsersData];
  };
};

type GetAllCommentResponseType = {
  data: {
    result: [CommentsData];
  };
};

type GetAllTicketResponseType = {
  data: {
    result: [TicketsData];
  };
};

type GetAllBannedUsersResponseType = {
  data: {
    result: [BannedUsersData];
  };
};

type GetAllCoursesResponseType = {
  data: {
    result: [CoursesData];
  };
};

type GetOneUserInfoResponseType = {
  data: {
    result: [UsersData];
  };
};

export type {
  UsersData,
  CommentsData,
  TicketsData,
  BannedUsersData,
  CoursesData,
  GetAllUserResponsesType,
  GetAllCommentResponseType,
  GetAllTicketResponseType,
  GetAllBannedUsersResponseType,
  GetAllCoursesResponseType,
  GetOneUserInfoResponseType,
};
