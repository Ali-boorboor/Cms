import { useRecoilState } from "recoil";
import { isAuth, isLoading } from "../Contexts/RecoilAtoms";
import { AxiosInstanceApp } from "../Services/AxiosInstanceApp";
import { useNavigate } from "react-router";
import { memo } from "react";

const PrivateRoutes = memo(({ children }: any) => {
  const [IsAuth, setIsAuth] = useRecoilState(isAuth);
  const [hasLoading, setHasLoading] = useRecoilState(isLoading);
  const navigate = useNavigate();

  AxiosInstanceApp.post(
    "/auth",
    {},
    {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }
  )
    .then(() => {
      setIsAuth(true);
    })
    .catch(() => {
      localStorage.removeItem("token");
      setIsAuth(false);
      navigate("/");
    })
    .finally(() => setHasLoading(false));

  return hasLoading ? (
    <div className="bg-zinc-500 fixed inset-0 z-50 flex justify-center items-center w-full text-3xl font-bold text-white">
      <p className="animate-bounce">Loading...</p>
    </div>
  ) : (
    IsAuth && children
  );
});

export default PrivateRoutes;
