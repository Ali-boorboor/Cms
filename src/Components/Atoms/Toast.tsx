import ReactDOM from "react-dom";
import { memo, useEffect } from "react";
import { useRecoilState } from "recoil";
import { isErrorModal, isResetModal, isSuccessModal } from "../../Contexts/RecoilAtoms";

const Toast = memo(({ icon, title }: any) => {
  const [resetModal, setResetModal] = useRecoilState(isResetModal);
  const [successModal, setSuccessModal] = useRecoilState(isSuccessModal);
  const [errorModal, setErrorModal] = useRecoilState(isErrorModal);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setResetModal(false);
      setSuccessModal(false);
      setErrorModal(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [resetModal, successModal, errorModal]);

  return ReactDOM.createPortal(
    <div className="flex items-center justify-center gap-2 w-80 animate-bounce p-2 text-center overflow-hidden fixed top-6 right-0 h-10 z-40 bg-lightRed rounded-tl-md rounded-bl-md border dark:border-white border-black">
      <p className="text-black text-lg font-bold text-nowrap">{title}</p>
      <p className="bg-white border border-black dark:border-white rounded-full p-1 animate-spin">
        {icon}
      </p>
    </div>,
    document.getElementById("modals-wrapper")!
  );
});

export default Toast;
