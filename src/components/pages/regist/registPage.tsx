import FormikInput from "@/components/shared/FormikInput";
import axiosInstance from "@/config/axios";
import {
  REGEX_STRONG_PASSWORD,
  VALIDATION_CONFIRM_PASSWORD_NOT_MATCH,
  VALIDATION_CONFIRM_PASSWORD_REQUIRED,
  VALIDATION_CONFIRM_PASSWORD_STRONG,
  VALIDATION_EMAIL_INVALID,
  VALIDATION_EMAIL_REQUIRED,
  VALIDATION_NAME_REQUIRED,
  VALIDATION_PASSWORD_REQUIRED,
} from "@/constants";
import { userLoadingAction } from "@/store/actions/user.actions";
import { RootState, useAppDispatch, useAppSelector } from "@/store/configStore";
import { ArrowNarrowRightIcon } from "@heroicons/react/outline";
import { Form, Formik } from "formik";
import { FC } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import * as Yup from "yup";
interface IinitialValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegistPage = () => {
  const userStore = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const initialValues: IinitialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(VALIDATION_NAME_REQUIRED),
    email: Yup.string()
      .required(VALIDATION_EMAIL_REQUIRED)
      .email(VALIDATION_EMAIL_INVALID),
    password: Yup.string()
      .required(VALIDATION_PASSWORD_REQUIRED)
      .matches(REGEX_STRONG_PASSWORD, VALIDATION_CONFIRM_PASSWORD_STRONG),
    confirmPassword: Yup.string()
      .required(VALIDATION_CONFIRM_PASSWORD_REQUIRED)
      .oneOf([Yup.ref("password")], VALIDATION_CONFIRM_PASSWORD_NOT_MATCH),
  });

  const handleSubmit = async (
    values: IinitialValues,
    setErrors: Function,
    resetForm: Function
  ) => {
    try {
      dispatch(userLoadingAction());
      const res = await axiosInstance.post("/auth/signup", {
        email: values.email,
        password: values.password,
        name: values.name,
      });
      if (res.status === 201 && res.data.result) {
        resetForm();
        navigate("/dang-nhap");
      }
    } catch (error) {
      const message = (error as any)?.response.data.message;
      if (error && message) {
        setErrors({ email: message });
      }
    } finally {
      dispatch(userLoadingAction());
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setErrors, resetForm }) => {
        handleSubmit(values, setErrors, resetForm);
      }}
    >
      {() => (
        <div className="flex flex-col lg:flex-row items-center lg:mt-10 max-w-5xl m-auto mb-28">
          <div className="lg:flex-1 mt-10 lg:mt-0 flex items-center justify-center">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="w-[200px] lg:w-full"
              alt=""
            />
          </div>
          <Form className="flex-1 mt-5 lg:mt-0 lg:ml-10">
            <div className="flex flex-row items-center justify-center lg:justify-start">
              <p className="text-md lg:text-lg mb-0 mr-4 text-white">Đăng kí</p>
            </div>
            {/* Name input */}
            <div className="mb-6 mt-10">
              <FormikInput
                name="name"
                className=" block w-full px-4 py-2 text-xs lg:text-sm font-normal text-primary bg-white  border border-solid border-gray-300 rounded transition ease-in-out m-0  focus:ring-high-light focus:ring-1 focus:outline-none"
                placeholder="Tên tài khoản"
              />
            </div>
            {/* Email input */}
            <div className="mb-6">
              <FormikInput
                name="email"
                className=" block w-full px-4 py-2 text-xs lg:text-sm font-normal text-primary bg-white  border border-solid border-gray-300 rounded transition ease-in-out m-0  focus:ring-high-light focus:ring-1 focus:outline-none"
                placeholder="Email"
              />
            </div>
            {/* Password input */}
            <div className="mb-6">
              <FormikInput
                name="password"
                type={"password"}
                className=" block w-full px-4 py-2 text-xs lg:text-sm font-normal text-primary bg-white  border border-solid border-gray-300 rounded transition ease-in-out m-0  focus:outline-none focus:ring-high-light focus:ring-1"
                placeholder="Mật khẩu"
              />
            </div>

            {/* Password input */}
            <div className="mb-6">
              <FormikInput
                type={"password"}
                name="confirmPassword"
                className=" block w-full px-4 py-2 text-xs lg:text-sm font-normal text-primary bg-white  border border-solid border-gray-300 rounded transition ease-in-out m-0  0 focus:outline-none focus:ring-high-light focus:ring-1"
                placeholder="Nhập lại mật khẩu"
              />
            </div>
            <div className="text-center lg:text-left">
              <button
                type="submit"
                className="inline-block px-7 py-2 lg:py-3 bg-high-light text-white font-medium text-xs lg:text-sm leading-snug uppercase rounded shadow-md focus:outline-none"
              >
                {userStore.loading ? "Đang tải..." : "Đăng kí"}
              </button>
              <div className="text-xs lg:text-sm font-semibold mt-2 pt-1 mb-0 flex items-center text-text-1">
                Tôi đã là một thành viên
                <Link
                  to={`/dang-nhap`}
                  className="text-high-light cursor-pointer hover:text-high-light focus:text-red-700 transition duration-200 ease-in-out text-xs lg:text-sm flex items-center"
                >
                  &nbsp; <ArrowNarrowRightIcon className="w-4 h-4 mx-2" /> Đăng
                  nhập
                </Link>
              </div>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};
export default RegistPage;
