import ReactDOM from "react-dom";
import { memo, useEffect } from "react";
import { useRecoilState } from "recoil";
import {
  isErrorModal,
  isResetModal,
  isSuccessModal,
  progressPersent,
} from "../../Contexts/RecoilAtoms";

const Toast = memo(({ icon, title }: any) => {
  const [resetModal, setResetModal] = useRecoilState(isResetModal);
  const [successModal, setSuccessModal] = useRecoilState(isSuccessModal);
  const [errorModal, setErrorModal] = useRecoilState(isErrorModal);
  const [progressBarPersent, setProgressBarPersent] = useRecoilState(progressPersent);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setResetModal(false);
      setSuccessModal(false);
      setErrorModal(false);
      setProgressBarPersent(100);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [resetModal, successModal, errorModal]);

  useEffect(() => {
    let startTime = Date.now();
    const duration = 3000;

    const interval = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const progress = (elapsedTime / duration) * 100;

      setProgressBarPersent(progress);
    }, 50);

    return () => clearInterval(interval);
  }, [progressBarPersent]);

  return ReactDOM.createPortal(
    <div className="flex flex-col items-center justify-end gap-2 w-96 h-20 animate-bounce text-center overflow-hidden fixed top-6 right-0 z-50 bg-primaryColor rounded-tl-md rounded-bl-md border dark:border-white border-black">
      <div className="flex items-center gap-2 p-2">
        <p className="text-black text-lg font-bold text-nowrap">{title}</p>
        <p className="bg-white border border-black dark:border-white rounded-full p-1 animate-spin">
          {icon}
        </p>
      </div>
      <div className="w-full h-2 overflow-hidden bg-white">
        <div
          className="h-full bg-black dark:bg-secondaryColor duration-700"
          style={{ width: `${progressBarPersent}%` }}
        ></div>
      </div>
    </div>,
    document.getElementById("modals-wrapper")!
  );
});

export default Toast;
