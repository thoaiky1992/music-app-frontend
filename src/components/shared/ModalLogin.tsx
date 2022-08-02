import { closeModalLoginAction } from "@/store/actions/modal-login.actions";
import { RootState, useAppDispatch, useAppSelector } from "@/store/configStore";
import { XIcon } from "@heroicons/react/outline";
import { useEffect, useRef, useState } from "react";
import LoginForm from "./LoginForm";
import RegistForm from "./RegistForm";

const ModalLogin = () => {
  const modalLoginStore = useAppSelector(
    (state: RootState) => state.modalLogin
  );
  const [isShowLoginForm, setIsShowLoginForm] = useState<boolean>(true);
  const modalLoginFormRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const handleCloseModal = () => {
    modalLoginFormRef.current?.classList.remove("animate-scale_enter");
    modalLoginFormRef.current?.classList.add("animate-scale_leave");
    setTimeout(() => {
      dispatch(closeModalLoginAction());
    }, 300);
  };

  useEffect(() => {
    if (modalLoginStore.isOpen) {
      modalLoginFormRef.current?.classList.remove("animate-scale_leave");
      modalLoginFormRef.current?.classList.add("animate-scale_enter");
    }
  }, [modalLoginStore.isOpen]);
  console.log(isShowLoginForm);

  return (
    <div
      className={`w-screen h-screen fixed z-50 flex justify-center items-center bg-transparent ${
        !modalLoginStore.isOpen && "hidden"
      }`}
    >
      <div className="absolute w-full h-full top-0 left-0 bg-app opacity-80"></div>
      <div
        ref={modalLoginFormRef}
        className="absolute w-[90%] lg:max-w-[800px] bg-primary shadow-xl shadow-text-1 border-text-1 border-t-[1px] text-white p-10 rounded-lg flex flex-col lg:flex-row"
      >
        <div className="flex-1 flex items-center justify-center">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            className="w-[200px] lg:w-full"
            alt=""
          />
        </div>
        <div className="flex-1 mt-10 lg:mt-0">
          {isShowLoginForm ? (
            <LoginForm
              handleDirectRegistForm={() => setIsShowLoginForm(() => false)}
            />
          ) : (
            <RegistForm
              handleDirectLoginForm={() => setIsShowLoginForm(() => true)}
            />
          )}
        </div>
        <div
          className="absolute top-2 right-2 bg-text-2 rounded-full p-1 lg:p-2 cursor-pointer hover:scale-95 transition-all ease-in-out"
          onClick={handleCloseModal}
        >
          <XIcon className="w-4 h-4 text-primary" />
        </div>
      </div>
    </div>
  );
};
export default ModalLogin;
