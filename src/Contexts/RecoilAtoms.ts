import { RecoilState, atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import {
  DarkModeType,
  globalSearchInputType,
  showGlobalSearchType,
  showHeaderItemsType,
} from "../Types/RecoilAtomsType/RecoilAtomsType";
import {
  BannedUsersData,
  CommentsData,
  CoursesData,
  TicketsData,
  UsersData,
} from "../Types/AxiosResponsesType/AxiosResponsesType";

const { persistAtom } = recoilPersist();

const DarkMode: DarkModeType = atom({
  key: "DarkMode",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

const globalSearchInput: globalSearchInputType = atom({
  key: "globalSearchInput",
  default: "",
});

const showGlobalSearch: showGlobalSearchType = atom({
  key: "showGlobalSearch",
  default: false,
});

const showHeaderItems: showHeaderItemsType = atom({
  key: "showHeaderItems",
  default: false,
});

const AllUsers: RecoilState<UsersData[]> = atom({
  key: "AllUsers",
  default: [
    {
      user_id: 0,
      user_name: "",
      user_email: "",
      user_password: "",
      registered_At: "",
      updated_At: "",
      user_courses: null,
    },
  ],
  effects_UNSTABLE: [persistAtom],
});

const AllComments: RecoilState<CommentsData[]> = atom({
  key: "AllComments",
  default: [
    {
      comment_id: 0,
      commenter_id: 0,
      commenter_name: "",
      comment_body: "",
      commented_At: "",
      course_id: 0,
    },
  ],
  effects_UNSTABLE: [persistAtom],
});

const AllTickets: RecoilState<TicketsData[]> = atom({
  key: "AllTickets",
  default: [
    {
      created_At: "",
      off_code: "",
      off_id: 0,
      course_id: 0,
      off_quantity: 0,
    },
  ],
  effects_UNSTABLE: [persistAtom],
});

const AllBannedUsers: RecoilState<BannedUsersData[]> = atom({
  key: "AllBannedUsers",
  default: [
    {
      banned_At: "",
      user_email: "",
      user_name: "",
      banned_id: 0,
    },
  ],
  effects_UNSTABLE: [persistAtom],
});

const AllCourses: RecoilState<CoursesData[]> = atom({
  key: "AllCourses",
  default: [
    {
      course_id: 0,
      course_duration: 0,
      course_price: 0,
      course_offer: 0,
      course_name: "",
      course_teacher: "",
      course_img: "",
      created_At: "",
      updated_At: "",
    },
  ],
  effects_UNSTABLE: [persistAtom],
});

const UserInfoSortFilter: RecoilState<boolean> = atom({
  key: "UserInfoSortFilter",
  default: false,
});

const UserInfoSearchInput: RecoilState<string> = atom({
  key: "UserInfoSearchInput",
  default: "",
});

const OneUserInfo: RecoilState<UsersData[]> = atom({
  key: "OneUserInfo",
  default: [
    {
      user_id: 0,
      user_name: "",
      user_email: "",
      user_password: "",
      registered_At: "",
      updated_At: "",
      user_courses: null,
    },
  ],
  effects_UNSTABLE: [persistAtom],
});

const AddUserNameInput: RecoilState<string> = atom({
  key: "AddUserNameInput",
  default: "",
});

const AddUserNameInputValidator: RecoilState<boolean> = atom({
  key: "AddUserNameInputValidator",
  default: false,
});

const AddUserPasswordInput: RecoilState<string> = atom({
  key: "AddUserPasswordInput",
  default: "",
});

const AddUserPasswordInputValidator: RecoilState<boolean> = atom({
  key: "AddUserPasswordInputValidator",
  default: false,
});

const AddUserEmailInput: RecoilState<string> = atom({
  key: "AddUserEmailInput",
  default: "",
});

const AddUserEmailInputValidator: RecoilState<boolean> = atom({
  key: "AddUserEmailInputValidator",
  default: false,
});

export {
  DarkMode,
  globalSearchInput,
  showGlobalSearch,
  showHeaderItems,
  AllUsers,
  AllComments,
  AllTickets,
  AllBannedUsers,
  AllCourses,
  UserInfoSortFilter,
  UserInfoSearchInput,
  OneUserInfo,
  AddUserNameInput,
  AddUserNameInputValidator,
  AddUserPasswordInput,
  AddUserPasswordInputValidator,
  AddUserEmailInput,
  AddUserEmailInputValidator,
};
