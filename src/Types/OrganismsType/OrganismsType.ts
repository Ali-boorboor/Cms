type MainHeaderType = React.MemoExoticComponent<() => JSX.Element>;
type MainSideBarType = React.MemoExoticComponent<() => JSX.Element>;
type TableType = React.MemoExoticComponent<({ children, th1, th2, th3, th4 }: any) => JSX.Element>;
type UserTableType = React.MemoExoticComponent<() => JSX.Element>;
type CommentTableType = React.MemoExoticComponent<() => JSX.Element>;
type UsersPageTableType = React.MemoExoticComponent<
  ({ children, th1, th2, th3, th4, th5, th6, th7 }: any) => JSX.Element
>;

export type {
  MainHeaderType,
  MainSideBarType,
  TableType,
  UserTableType,
  CommentTableType,
  UsersPageTableType,
};
