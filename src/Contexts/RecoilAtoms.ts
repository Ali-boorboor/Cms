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

const usersCount: RecoilState<number> = atom({
  key: "usersCount",
  default: 0,
});

const isResetModal: RecoilState<boolean> = atom({
  key: "isResetModal",
  default: false,
});

const isSuccessModal: RecoilState<boolean> = atom({
  key: "isSuccessModal",
  default: false,
});

const isErrorModal: RecoilState<boolean> = atom({
  key: "isErrorModal",
  default: false,
});

const progressPersent = atom({
  key: "progressPersent",
  default: 100,
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

const AddCourseNameInput: RecoilState<string> = atom({
  key: "AddCourseNameInput",
  default: "",
});

const AddCourseNameInputValidator: RecoilState<boolean> = atom({
  key: "AddCourseNameInputValidator",
  default: false,
});

const AddCourseCoverUploader: RecoilState<string> = atom({
  key: "AddCourseCoverUploader",
  default: "",
});

const AddCourseCoverUploaderValidator: RecoilState<boolean> = atom({
  key: "AddCourseCoverUploaderValidator",
  default: false,
});

const AddCourseTeacherInput: RecoilState<string> = atom({
  key: "AddCourseTeacherInput",
  default: "",
});

const AddCourseTeacherInputValidator: RecoilState<boolean> = atom({
  key: "AddCourseTeacherInputValidator",
  default: false,
});

const AddCoursePriceInput: RecoilState<number> = atom({
  key: "AddCoursePriceInput",
  default: 0,
});

const AddCoursePriceInputValidator: RecoilState<boolean> = atom({
  key: "AddCoursePriceInputValidator",
  default: false,
});

const AddCourseDurationInput: RecoilState<number> = atom({
  key: "AddCourseDurationInput",
  default: 0,
});

const AddCourseDurationInputValidator: RecoilState<boolean> = atom({
  key: "AddCourseDurationInputValidator",
  default: false,
});

const coursesCount = atom({
  key: "coursesCount",
  default: 0,
});

const courseSearchInput = atom({
  key: "courseSearchInput",
  default: "",
});

const courseSortFilter = atom({
  key: "courseSortFilter",
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
  usersCount,
  isResetModal,
  isSuccessModal,
  isErrorModal,
  UserInfoSortFilter,
  UserInfoSearchInput,
  OneUserInfo,
  AddUserNameInput,
  AddUserNameInputValidator,
  AddUserPasswordInput,
  AddUserPasswordInputValidator,
  AddUserEmailInput,
  AddUserEmailInputValidator,
  AddCourseNameInput,
  AddCourseNameInputValidator,
  AddCourseCoverUploader,
  AddCourseCoverUploaderValidator,
  AddCourseTeacherInput,
  AddCourseTeacherInputValidator,
  AddCoursePriceInput,
  AddCoursePriceInputValidator,
  AddCourseDurationInput,
  AddCourseDurationInputValidator,
  coursesCount,
  courseSearchInput,
  courseSortFilter,
  progressPersent,
};
