import { memo } from "react";
import { IoIosWarning } from "react-icons/io";

const Alert: React.MemoExoticComponent<({ text }: any) => JSX.Element> = memo(({ text }: any) => {
  return (
    <h3 className="text-xl font-bold p-2 rounded-lg text-red-600 bg-trinityColor flex items-center gap-2 justify-center text-center">
      {text}
      <IoIosWarning className="w-6 h-6" />
    </h3>
  );
});

export default Alert;
