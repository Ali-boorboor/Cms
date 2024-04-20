import { RecoilState } from "recoil";

type DarkModeType = RecoilState<boolean>;
type globalSearchInputType = RecoilState<string>;
type showGlobalSearchType = RecoilState<boolean>;
type showHeaderItemsType = RecoilState<boolean>;

export type { DarkModeType, globalSearchInputType, showGlobalSearchType, showHeaderItemsType };
