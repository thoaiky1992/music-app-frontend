import FormikInput from "@/components/shared/FormikInput";
import {
  REGEX_STRONG_PASSWORD,
  VALIDATION_CONFIRM_PASSWORD_NOT_MATCH,
  VALIDATION_CONFIRM_PASSWORD_STRONG,
  VALIDATION_NAME_REQUIRED,
} from "@/constants";
import { updateUserAction } from "@/store/actions/user.actions";
import { RootState, useAppDispatch, useAppSelector } from "@/store/configStore";
import { ArrowNarrowRightIcon } from "@heroicons/react/outline";
import { Form, Formik } from "formik";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

interface InterfaceInitialValues {
  image: string | undefined;
  email: string | undefined;
  name: string | undefined;
  newPassword: string;
  confirmNewPassword: string;
}

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const userStore = useAppSelector((state: RootState) => state.user);
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<{
    src: string | undefined;
    data: File | null;
  }>(() => ({ src: userStore.user?.image, data: null }));
  const [initialValues, setInitialValues] = useState<InterfaceInitialValues>(
    () => ({
      image: userStore.user?.image,
      name: userStore.user?.name,
      email: userStore.user?.email,
      newPassword: "",
      confirmNewPassword: "",
    })
  );
  const validationSchema = Yup.object().shape({
    name: Yup.string().required(VALIDATION_NAME_REQUIRED),
    newPassword: Yup.string().matches(
      REGEX_STRONG_PASSWORD,
      VALIDATION_CONFIRM_PASSWORD_STRONG
    ),
    confirmNewPassword: Yup.string().oneOf(
      [Yup.ref("password")],
      VALIDATION_CONFIRM_PASSWORD_NOT_MATCH
    ),
  });

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setFile(() => ({
          ...file,
          src: reader.result as string,
          data: e.target.files![0],
        }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const handleSubmit = async (
    values: InterfaceInitialValues,
    setErrors: Function,
    resetForm: Function
  ) => {
    const formData = new FormData();
    for (let key in values) {
      formData.append(key, (values as any)[key]);
    }
    if (file.data) {
      formData.append("file", file.data);
    }
    dispatch(updateUserAction(formData, setErrors, resetForm, toast));
  };

  useEffect(() => {
    if (userStore.user) {
      setInitialValues(() => ({
        image: userStore.user?.image,
        name: userStore.user?.name,
        email: userStore.user?.email,
        newPassword: "",
        confirmNewPassword: "",
      }));
    }
  }, [userStore.user]);
  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={(values, { setErrors, resetForm }) => {
        handleSubmit(values, setErrors, resetForm);
      }}
    >
      {({ values }) => (
        <Form>
          <input
            ref={fileRef}
            type="file"
            name="file"
            className="hidden"
            onChange={handleChangeFile}
          />
          <Toaster />
          <div className="w-full max-w-screen-sm lg:max-w-screen-md text-text-2 m-auto">
            <h1 className="text-text-2 text-2xl text-center">
              Th??ng tin t??i kho???n
            </h1>
            <div className="w-full flex flex-col lg:flex-row lg:mt-10">
              <div className="mt-10">
                <img
                  className="w-[250px] h-[250px] object-cover rounded-full m-auto"
                  src={file.src}
                  alt=""
                />
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="flex items-center border-[2px] border-text-1 p-2 rounded-lg m-auto mt-5 hover:text-white hover:border-white transition-all ease-in-out"
                >
                  <AiOutlinePlus className="w-5 h-5 mr-2" />
                  <span className="text-sm">Ch???n ???nh ?????i di???n</span>
                </button>
              </div>
              <div className="w-full flex-1 flex flex-col items-center lg:ml-20">
                <div className="flex flex-col w-full m-auto">
                  <label htmlFor="name" className="mb-2">
                    T??n t??i kho???n
                  </label>
                  <FormikInput
                    placeholder="T??n t??i kho???n..."
                    name="name"
                    value={values.name}
                    className="block w-full px-4 py-2 text-xs lg:text-sm font-normal text-text-2 bg-transparent border border-solid border-text-2 rounded transition ease-in-out focus:outline-none"
                  />
                </div>

                <div className="flex flex-col w-full m-auto mt-5">
                  <label htmlFor="newPassword" className="mb-2">
                    M???t kh???u m???i
                  </label>
                  <FormikInput
                    type={"password"}
                    placeholder="M???t kh???u m???i..."
                    name="newPassword"
                    value={values.newPassword}
                    className="block w-full px-4 py-2 text-xs lg:text-sm font-normal text-text-2 bg-transparent border border-solid border-text-2 rounded transition ease-in-out focus:outline-none"
                  />
                </div>

                <div className="flex flex-col w-full m-auto mt-5">
                  <label htmlFor="confirmNewPassword" className="mb-2">
                    Nh???p l???i m???t kh???u
                  </label>
                  <FormikInput
                    type={"password"}
                    placeholder="Nh???p l???i m???t kh???u..."
                    name="confirmNewPassword"
                    value={values.confirmNewPassword}
                    className="block w-full px-4 py-2 text-xs lg:text-sm font-normal text-text-2 bg-transparent border border-solid border-text-2 rounded transition ease-in-out focus:outline-none"
                  />
                </div>

                <div className="text-center lg:text-left w-full mt-10 mb-44 lg:mb-20">
                  <button
                    type="submit"
                    className="inline-block px-7 py-2 lg:py-3 bg-high-light text-white font-medium text-xs lg:text-sm leading-snug uppercase rounded shadow-md focus:outline-none"
                  >
                    {userStore.loading ? "??ang t???i..." : "C???p nh???t"}
                  </button>
                  <div className="text-xs lg:text-sm font-semibold mt-2 pt-1 mb-0 flex items-center text-text-1">
                    Ti???p t???c ch???nh s???a ??
                    <Link
                      to={"/"}
                      className="text-high-light cursor-pointer hover:text-high-light focus:text-red-700 transition duration-200 ease-in-out text-xs lg:text-sm flex items-center"
                    >
                      &nbsp; <ArrowNarrowRightIcon className="w-4 h-4 mx-2" />{" "}
                      Quay l???i trang ch???
                    </Link>
                  </div>
                  ??
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ProfilePage;
