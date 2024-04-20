type UsersData = {
  user_id: number;
  user_name: string;
  user_email: string;
  user_password: string;
  registered_At: Date;
  updated_At: Date;
  user_courses: null;
};

type CommentsData = {
  comment_id: number;
  commenter_id: number;
  commenter_name: string;
  comment_body: string;
  course_id: number;
  commented_At: Date;
};

type TicketsData = {
  created_At: Date;
  off_code: string;
  off_id: number;
  course_id: number;
  off_quantity: number;
};

type BannedUsersData = {
  banned_At: Date;
  user_email: string;
  user_name: string;
  banned_id: number;
};

type CoursesData = {
  course_id: number;
  course_duration: number;
  course_price: number;
  course_offer: number;
  course_name: string;
  course_teacher: string;
  course_img: string;
  created_At: Date;
  updated_At: Date;
};

type GetAllUserResponsesType = {
  data: {
    data: [UsersData];
  };
};

type GetAllCommentResponseType = {
  data: {
    data: [CommentsData];
  };
};

type GetAllTicketResponseType = {
  data: {
    data: [TicketsData];
  };
};

type GetAllBannedUsersResponseType = {
  data: {
    data: [BannedUsersData];
  };
};

type GetAllCoursesResponseType = {
  data: {
    data: [CoursesData];
  };
};

type GetOneUserInfoResponseType = {
  data: {
    data: [UsersData];
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
