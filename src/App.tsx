import Router from "./Routes/Routes";
import { memo, useEffect } from "react";
import { useRoutes } from "react-router";
import { useRecoilValue } from "recoil";
import { DarkMode } from "./Contexts/RecoilAtoms";
import MainHeader from "./Components/Organisms/MainHeader";
import MainSideBar from "./Components/Organisms/MainSideBar";

const App = memo(() => {
  const Routes = useRoutes(Router);
  const Theme = useRecoilValue(DarkMode);

  useEffect(() => {
    Theme
      ? (document.body.className = "dark bg-lightBlack bg-opacity-80")
      : (document.body.className = "bg-zinc-300");
  }, [Theme]);

  return (
    <>
      <section className="flex items-start gap-4">
        <MainSideBar />
        <section className="flex flex-col gap-4 basis-4/5">
          <MainHeader />
          {Routes}
        </section>
      </section>
    </>
  );
});

export default App;
