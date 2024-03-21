import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { useDispatch } from "react-redux";
import { hideError } from "../state/error";

const Error = () => {
  const { show, error } = useSelector((state: RootState) => state.error);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(hideError());
  };
  return (
    <div
      onClick={handleClick}
      className={`absolute bottom-5 right-5 min-h-20 min-w-20 text-white bg-red-600 flex items-center justify-center rounded-lg py-2 px-5 cursor-pointer select-none active:bg-red-700 ease-in duration-100 ${
        show ? "" : "hidden"
      }`}
    >
      {error}
    </div>
  );
};
export default Error;
