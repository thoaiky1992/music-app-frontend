import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { LogoutIcon, UserIcon } from "@heroicons/react/outline";
import NarutoImg from "@/assets/images/naruto.png";
import { RootState, useAppDispatch, useAppSelector } from "@/store/configStore";
import { openModalLoginAction } from "@/store/actions/modal-login.actions";
const HeaderUserInfo = () => {
  const userStore = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  return (
    <div className="user-info hidden lg:flex items-center">
      {userStore?.user ? (
        <Menu as="div" className="relative inline-block text-left z-50">
          <div>
            <Menu.Button className="flex items-center cursor-pointer">
              <img
                src={NarutoImg}
                className="w-[40px] lg:w-[50px] rounded-full border-2 border-high-light"
                alt=""
              />
              <span className="px-2 text-xs lg:text-sm">KySomaio</span>
              <ChevronDownIcon className="w-4" />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right divide-y rounded-md bg-primary shadow-lg shadow-text-1 border-t-[1px] border-text-1 ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1 ">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-high-light text-white" : "text-text-1"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm transition-all`}
                    >
                      <UserIcon className="w-4 h-4 mr-3" />
                      Profile
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-high-light text-white" : "text-text-1"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm transition-all mt-1`}
                    >
                      <LogoutIcon className="w-4 h-4 mr-3" />
                      Đăng xuất
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      ) : (
        <div
          className="cursor-pointer text-text-2"
          onClick={() => dispatch(openModalLoginAction())}
        >
          Đăng nhập
        </div>
      )}
    </div>
  );
};
export default HeaderUserInfo;
